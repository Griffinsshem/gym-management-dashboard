from functools import wraps
from flask import request, jsonify
from app.utils.token import decode_token


def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"success": False, "error": "Authorization header missing"}), 401

        try:
            token = auth_header.split(" ")[1]
            payload = decode_token(token)
            request.user = payload  # attach user to request
        except Exception:
            return jsonify({"success": False, "error": "Invalid or expired token"}), 401

        return f(*args, **kwargs)

    return decorated


def require_role(*roles):
    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user = getattr(request, "user", None)

            if not user:
                return jsonify({"success": False, "error": "Unauthorized"}), 401

            if user.get("role") not in roles:
                return jsonify({"success": False, "error": "Forbidden"}), 403

            return f(*args, **kwargs)

        return decorated
    return wrapper