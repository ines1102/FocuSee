# Importation des modules nécessaires
from flask import render_template, request, redirect, url_for, session, flash, make_response
from app import app, db
import hashlib

app.secret_key = "123"

# Définition du modèle Medecin dans la base de données
class Medecin(db.Model):
    _bind_key_ = 'medecins'  # Clé de liaison pour spécifier la base de données
    id = db.Column(db.Integer, primary_key=True)  
    nom = db.Column(db.String(80), nullable=False)  
    mdp = db.Column(db.String(120), nullable=False)  

# Définition du modèle Patient dans la base de données
class Patient(db.Model):
    _bind_key_ = 'patients'  # Clé de liaison pour spécifier la base de données
    id = db.Column(db.Integer, primary_key=True) 
    nom = db.Column(db.String(100))  
    taille = db.Column(db.Integer)  
    poids = db.Column(db.Integer)  


# Création des tables dans la base de données au démarrage de l'application
with app.app_context():
    db.create_all()

# Route pour la page d'accueil
@app.route('/')
def index():
    return render_template('connexion.html', title='MDM')


