# Importez les modules nécessaires depuis SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

# Instanciez la base de données SQLAlchemy
db = SQLAlchemy()

# Modèle Patient avec la colonne 'nom' ajoutée
class Medecin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    mdp = db.Column(db.String(128), nullable=False)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    taille = db.Column(db.Integer, nullable=True)
    poids = db.Column(db.Integer, nullable=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    mdp = db.Column(db.String(128), nullable=False)

# Modèle Parent
class Parent(db.Model):
    __tablename__ = 'parent'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    mdp = db.Column(db.String(255), nullable=False)
    

# Modèle pour les abonnés à la newsletter
class NewsletterSubscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

