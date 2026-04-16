from functools import wraps
from flask import request, jsonify
from app.utils.token import decode_token

def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({
                "success": False,
                "error": "Authorization header missing"
            }), 401

        try:
            token = auth_header.split(" ")[1]
            user_data = decode_token(token)
            request.user = user_data

        except Exception as e:
            return jsonify({
                "success": False,
                "error": str(e)
            }), 401

        return f(*args, **kwargs)

    return wrapper