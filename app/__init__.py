from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__, static_url_path='/static', static_folder='static')

# Configurer la base de données SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/main.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Instanciez la base de données SQLAlchemy avec l'application
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Importer les modèles ici pour qu'ils soient pris en compte lors des migrations
from app.models import Medecin, Patient, Parent, NewsletterSubscriber

# Importer les vues après la création de 'app' et 'db'
from app import views

# Création des tables dans la base de données au démarrage de l'application
with app.app_context():
    db.create_all()
