from flask import Blueprint, request
from app.services.auth_service import AuthService
from app.utils.decorators import jwt_required, require_role
from app.utils.response import success_response, error_response

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
        return error_response(
            "Invalid request body",
            "BAD_REQUEST",
            400
        )

    try:
        user = auth_service.create_staff_user(
            email=data.get("email"),
            password=data.get("password")
        )

        return success_response(
            data={
                "id": user.id,
                "email": user.email,
                "role": user.role.value
            },
            message="Staff account created successfully"
        )

    except ValueError as e:
        return error_response(
            str(e),
            "CREATE_STAFF_ERROR",
            400
        )

    except Exception as e:
        print("CREATE STAFF ERROR:", str(e))

        import traceback
        traceback.print_exc()

        return error_response(
            "Internal server error",
            "SERVER_ERROR",
            500
        )