from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static', static_folder='static')

# Configuration de la base de données principale
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data_medecins.db'

# Configuration des binds pour des bases de données supplémentaires
app.config['SQLALCHEMY_BINDS'] = {
    'patients': 'sqlite:///data_patients.db'
}

# Configuration du répertoire statique
app.config['STATIC_FOLDER'] = 'static'

db = SQLAlchemy(app)

# Importer les vues après la création de 'app' et 'db'
from app import views
