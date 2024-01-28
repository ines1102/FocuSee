# Importation des modules nécessaires
from flask import render_template, request, redirect, url_for, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from .models import Patient, Parent, Medecin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
from flask import session
from flask import flash
from app import app, db
from . import db

# Importez les modèles depuis le fichier models.py
from .models import Medecin, Patient, Parent

app.secret_key = "123"

# Route pour la page de connexion
@app.route('/connexion', methods=['GET', 'POST'])
def connexion_utilisateur():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = None

        # Vérifier si l'utilisateur est un Patient
        user = Patient.query.filter_by(email=email).first()

        # Si l'utilisateur n'est pas un Patient, vérifier si c'est un Parent
        if user is None:
            user = Parent.query.filter_by(email=email).first()

        # Si l'utilisateur n'est ni Patient ni Parent, vérifier si c'est un Medecin
        if user is None:
            user = Medecin.query.filter_by(email=email).first()

        if user and check_password_hash(user.mdp, password):
            login_user(user)
            return redirect(url_for('accueil'))
        else :
            flash('Adresse e-mail ou mot de passe incorrect.', 'error')

    return render_template('connexion.html')

@app.route('/deconnexion')
@login_required
def deconnexion_utilisateur():
    logout_user()
    return redirect(url_for('connexion'))

@app.route('/ajouter_utilisateur', methods=['POST'])
def ajouter_utilisateur():
    role = request.form.get('role')
    nom = request.form.get('nom')
    email = request.form.get('email')
    password = request.form.get('password')

    if role == 'Patient':
        age = request.form.get('age')
        taille = request.form.get('taille')
        poids = request.form.get('poids')
        new_user = Patient(nom=nom, age=age, taille=taille, poids=poids, email=email, mdp=generate_password_hash(password))

    elif role == 'Parent':
        new_user = Parent(name=nom, email=email, mdp=generate_password_hash(password))

    elif role == 'Medecin':
        new_user = Medecin(nom=nom, email=email, mdp=generate_password_hash(password))

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for('accueil'))


@app.route('/notif')
def notif():
    message_text = request.args.get('message', '')
    message_type = request.args.get('type', 'info')  # Par défaut, si le type n'est pas spécifié, utilisez 'info'

    # Définir le type d'icône et le texte en fonction du type de message
    if message_type == 'success':
        message_icon = 'check-circle.svg'
        message_alt = 'Success'
    elif message_type == 'error':
        message_icon = 'cross-circle.svg'
        message_alt = 'Error'
    else:
        message_icon = 'info-circle.svg'
        message_alt = 'Info'

    message = {
        'type': message_type,
        'icon': message_icon,
        'alt': message_alt,
        'text': message_text,
    }

    return render_template('notif.html', message=message)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Recherche de l'utilisateur dans la base de données par adresse e-mail
        user = Medecin.query.filter_by(email=email).first()

        if user and check_password_hash(user.mdp, password):
            # Connexion réussie, stockez l'ID de l'utilisateur dans la session
            session['user_id'] = user.id
            flash('Connexion réussie!', 'success')
            return redirect(url_for('acceuil'))
        else:
            # Adresse e-mail ou mot de passe incorrect, affichez un message d'erreur
            flash('Adresse e-mail ou mot de passe incorrect.', 'error')

    # Si la méthode est GET ou si la connexion a échoué, affichez la page de connexion
    return render_template('index.html', title='Accueil')

@app.route('/acceuil')
def acceuil():
    return render_template('index.html', title='Accueil')

@app.route('/ajout')
def ajout():
    return render_template('ajout.html', title='Ajout de patient')

@app.route('/choix')
def choix():
    return render_template('choix.html', title='Choix du patient')

@app.route('/about')
def about():
    return render_template('about.html', title='A Propos')

@app.route('/contact')
def contact():
    return render_template('contact.html', title='Contact')

@app.route('/FAQ')
def faq():
    return render_template('FAQ.html', title='FAQ')


# Dummy user data (replace with your authentication system)
dummy_user = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'password': 'hashed_password'
}

@app.route('/profil')
def profile():
    return render_template('profil.html', user=dummy_user)

@app.route('/update_profile', methods=['POST'])
def update_profile():
    new_email = request.form.get('new-email')
    new_password = request.form.get('new-password')

    return render_template('profil.html', user=dummy_user)


# Route pour s'abonner à la newsletter
@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        # Assurez-vous que la demande a le bon type de contenu
        if request.headers['Content-Type'] != 'application/json':
            # Si le type de contenu n'est pas JSON, renvoyez une réponse d'erreur
            flash('Unsupported Media Type: Le type de contenu de la requête n\'est pas \'application/json\'.', 'error')
            return redirect(url_for('notif'))

        # Obtenir les données JSON de la requête
        data = request.get_json()

        # Assurez-vous que "email" est dans les données
        if 'email' not in data:
            flash('L\'adresse e-mail est requise', 'error')
            return redirect(url_for('notif'))

        # Récupérer l'adresse e-mail
        email = data['email']

        # Enregistrez l'adresse e-mail dans la base de données ou effectuez d'autres opérations nécessaires
        # Exemple: db.save_email(email)

        # Notification réussie
        flash('Inscription réussie à la newsletter', 'success')
        return redirect(url_for('notif'))

    except Exception as e:
        # En cas d'erreur, affichez une notification d'erreur
        flash(str(e), 'error')
        return redirect(url_for('notif'))