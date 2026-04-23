import jwt
import datetime
import os

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret")


def generate_access_token(user):
    payload = {
        "user_id": user.id,
        "email": user.email,
        "role": user.role.value if hasattr(user.role, "value") else str(user.role),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return token


def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")