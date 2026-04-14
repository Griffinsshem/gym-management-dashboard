from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config.from_object(os.getenv("FLASK_CONFIG", "config.DevelopmentConfig"))

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    
    # Health check route
    @app.route("/")
    def health():
        return {"status": "ok"}

    return app