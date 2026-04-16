from functools import wraps
from flask import request, jsonify, g
from app.utils.token import decode_token


def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"success": False, "error": "Missing token"}), 401

        try:
            token = auth_header.split(" ")[1]
            payload = decode_token(token)

            # Store user info globally for request
            g.user = payload

        except Exception:
            return jsonify({"success": False, "error": "Invalid token"}), 401

        return f(*args, **kwargs)

    return decorated


def roles_required(*roles):
    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user_role = g.user.get("role")

            if user_role not in roles:
                return jsonify({"success": False, "error": "Forbidden"}), 403

            return f(*args, **kwargs)

        return decorated
    return wrapper