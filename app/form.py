# app/forms.py

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, IntegerField
from wtforms.validators import DataRequired, Email

class PatientRegistrationForm(FlaskForm):
    nom = StringField('Nom', validators=[DataRequired()])
    age = IntegerField('Age')
    taille = IntegerField('Taille')
    poids = IntegerField('Poids')
    email = StringField('Email', validators=[DataRequired(), Email()])
    mdp = PasswordField('Mot de passe', validators=[DataRequired()])

class MedecinRegistrationForm(FlaskForm):
    nom = StringField('Nom', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    mdp = PasswordField('Mot de passe', validators=[DataRequired()])

class ParentRegistrationForm(FlaskForm):
    name = StringField('Nom', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    mdp = PasswordField('Mot de passe', validators=[DataRequired()])
