from flask import Blueprint, request

from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository

from app.utils.decorators import (
    jwt_required,
    require_role
)

from app.utils.response import (
    success_response,
    error_response
)

users_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/api/v1/users"
)

auth_service = AuthService()
user_repo = UserRepository()


@users_bp.route("/staff", methods=["GET"])
@jwt_required
@require_role("admin")
def get_staff_users():
    try:
        users = user_repo.get_staff_users()

        data = [
            {
                "id": user.id,
                "email": user.email,

                "role": (
                    user.role.value
                    if hasattr(user.role, "value")
                    else str(user.role)
                ),

                "is_active": user.is_active,

                "created_at": (
                    user.created_at.isoformat()
                    if user.created_at
                    else None
                )
            }
            for user in users
        ]

        return success_response(
            data=data,
            message="Staff users fetched successfully"
        )

    except Exception as e:
        print("GET STAFF USERS ERROR:", str(e))

        return error_response(
            "Failed to fetch staff users",
            "FETCH_STAFF_ERROR",
            500
        )



@users_bp.route("/staff", methods=["POST"])
@jwt_required
@require_role("admin")
def create_staff_user():
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

                "role": (
                    user.role.value
                    if hasattr(user.role, "value")
                    else str(user.role)
                )
            },
            message="Staff account created successfully",
            status_code=201
        )

    except ValueError as e:
        return error_response(
            str(e),
            "CREATE_STAFF_ERROR",
            400
        )

    except Exception as e:
        print("CREATE STAFF ERROR:", str(e))

        return error_response(
            "Internal server error",
            "SERVER_ERROR",
            500
        )