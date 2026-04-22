from flask import Flask
from dotenv import load_dotenv
import os

from app.extensions import db, migrate, bcrypt
from app.utils.response import error_response


def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.config.from_object(os.getenv("FLASK_CONFIG", "config.DevelopmentConfig"))

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    # Import models AFTER db init (important)
    from app import models  # noqa

    # Register Blueprints
    from app.api.auth.routes import auth_bp
    from app.api.members.routes import member_bp
    from app.api.membership_plans.routes import plans_bp
    from app.api.subscriptions.routes import subscriptions_bp
    from app.api.attendance.routes import attendance_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(member_bp)
    app.register_blueprint(plans_bp)
    app.register_blueprint(subscriptions_bp)
    app.register_blueprint(attendance_bp)


    @app.errorhandler(400)
    def bad_request(e):
        return error_response("Bad request", "BAD_REQUEST", 400)

    @app.errorhandler(401)
    def unauthorized(e):
        return error_response("Unauthorized", "UNAUTHORIZED", 401)

    @app.errorhandler(403)
    def forbidden(e):
        return error_response("Forbidden", "FORBIDDEN", 403)

    @app.errorhandler(404)
    def not_found(e):
        return error_response("Resource not found", "NOT_FOUND", 404)

    @app.errorhandler(422)
    def unprocessable(e):
        return error_response("Unprocessable entity", "VALIDATION_ERROR", 422)

    @app.errorhandler(500)
    def server_error(e):
        return error_response("Internal server error", "SERVER_ERROR", 500)

    @app.route("/")
    def health():
        return {"status": "ok"}

    return app