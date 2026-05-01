from flask import Blueprint, request
from app.services.auth_service import AuthService
from app.utils.response import success_response, error_response

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")
auth_service = AuthService()

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return error_response("Invalid request body", "BAD_REQUEST", 400)

    try:
        user = auth_service.register_user(
            email=data.get("email"),
            password=data.get("password")
        )


        return success_response(
            data={
                "id": user.id,
                "email": user.email
            },
            message="User registered successfully"
        )

    except ValueError as e:
        return error_response(str(e), "REGISTER_ERROR", 400)

    except Exception:
        return error_response("Internal server error", "SERVER_ERROR", 500)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return error_response("Invalid request body", "BAD_REQUEST", 400)

    try:
        result = auth_service.login_user(
            email=data.get("email"),
            password=data.get("password")
        )

        return success_response(
            data={
                "id": result["user"].id,
                "email": result["user"].email,
                "role": result["user"].role.value,
                "access_token": result["access_token"],
                "member_id": result["member_id"]
            },
            message="Login successful"
        )

    except ValueError as e:
        return error_response(str(e), "AUTH_ERROR", 401)

    
    except Exception as e:
        print("REGISTER ERROR:", str(e))  
        import traceback
        traceback.print_exc()      
        return error_response(str(e), "SERVER_ERROR", 500)