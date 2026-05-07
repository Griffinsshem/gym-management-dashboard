from flask import Blueprint, request, jsonify

from app.services.auth_service import AuthService
from app.utils.decorators import jwt_required, require_role

users_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/api/v1/users"
)

auth_service = AuthService()


@users_bp.route("/staff", methods=["POST"])
@jwt_required
@require_role("admin")
def create_staff():
    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "error": "Invalid request body"
        }), 400

    try:
        user = auth_service.create_staff_user(
            email=data.get("email"),
            password=data.get("password")
        )

        return jsonify({
            "success": True,
            "message": "Staff account created successfully",
            "data": {
                "id": user.id,
                "email": user.email,
                "role": user.role.value
            }
        }), 201

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500