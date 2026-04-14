from flask import Flask
from dotenv import load_dotenv
import os

from app.extensions import db, migrate, bcrypt

def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config.from_object(os.getenv("FLASK_CONFIG", "config.DevelopmentConfig"))

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Import models AFTER db init (important)
    from app import models

    @app.route("/")
    def health():
        return {"status": "ok"}

    return app