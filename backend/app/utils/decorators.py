from functools import wraps
from flask import request, jsonify, g
from app.utils.token import decode_token


# ================= JWT REQUIRED =================
def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({
                "success": False,
                "error": "Authorization header missing"
            }), 401

        try:
            parts = auth_header.split(" ")

            if len(parts) != 2 or parts[0] != "Bearer":
                raise ValueError("Invalid token format")

            token = parts[1]
            payload = decode_token(token)

            g.user = payload

        except Exception:
            return jsonify({
                "success": False,
                "error": "Invalid or expired token"
            }), 401

        return f(*args, **kwargs)

    return decorated


# ================= ROLE CHECK =================
def require_role(*roles):
    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user = getattr(g, "user", None)

            if not user:
                return jsonify({
                    "success": False,
                    "error": "Unauthorized"
                }), 401

            user_role = user.get("role")

            if user_role not in roles:
                return jsonify({
                    "success": False,
                    "error": f"Forbidden: requires role {roles}"
                }), 403

            return f(*args, **kwargs)

        return decorated
    return wrapper


# ================= SELF OR ADMIN =================
def require_self_or_admin(param_name="member_id"):
    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            user = getattr(g, "user", None)

            if not user:
                return jsonify({
                    "success": False,
                    "error": "Unauthorized"
                }), 401

            if user.get("role") in ["admin", "staff"]:
                return f(*args, **kwargs)

            requested_id = (
                kwargs.get(param_name) or
                request.args.get(param_name) or
                (request.json.get(param_name) if request.is_json else None)
            )

            if not requested_id:
                return jsonify({
                    "success": False,
                    "error": "Missing member_id"
                }), 400

            try:
                requested_id = int(requested_id)
            except:
                return jsonify({
                    "success": False,
                    "error": "Invalid member_id"
                }), 400

            if user.get("member_id") != requested_id:
                return jsonify({
                    "success": False,
                    "error": "Forbidden: Access denied"
                }), 403

            return f(*args, **kwargs)

        return decorated
    return wrapper