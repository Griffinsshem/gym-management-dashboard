from flask import Flask
from dotenv import load_dotenv
import os
from app.api.membership_plans.routes import plans_bp
from app.api.subscriptions.routes import subscriptions_bp
from app.api.attendance.routes import attendance_bp
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

    # Register Blueprints
    from app.api.auth.routes import auth_bp
    from app.api.members.routes import member_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(member_bp)
    app.register_blueprint(plans_bp)
    app.register_blueprint(subscriptions_bp)
    app.register_blueprint(attendance_bp)

    # Health check
    @app.route("/")
    def health():
        return {"status": "ok"}

    return app