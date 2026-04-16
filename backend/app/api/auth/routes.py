from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")
auth_service = AuthService()


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    try:
        user = auth_service.register_user(
            email=data.get("email"),
            password=data.get("password")
        )

        return jsonify({
            "success": True,
            "data": {
                "id": user.id,
                "email": user.email
            }
        }), 201

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    try:
        result = auth_service.login_user(
            email=data.get("email"),
            password=data.get("password")
        )

        return jsonify({
            "success": True,
            "data": {
                "id": result["user"].id,
                "email": result["user"].email,
                "access_token": result["access_token"]
            }
        })

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 401