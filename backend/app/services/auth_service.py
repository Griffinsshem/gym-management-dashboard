from app.repositories.user_repository import UserRepository
from app.repositories.member_repository import MemberRepository
from app.extensions import bcrypt
from app.utils.token import generate_access_token


class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()
        self.member_repo = MemberRepository()

    def register_user(self, email, password, role="member"):
        existing_user = self.user_repo.get_by_email(email)
        if existing_user:
            raise ValueError("User already exists")

        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

        user = self.user_repo.create({
            "email": email,
            "password_hash": password_hash,
            "role": role
        })

        return user

    def login_user(self, email, password):
        user = self.user_repo.get_by_email(email)

        if not user:
            raise ValueError("Invalid credentials")

        if not bcrypt.check_password_hash(user.password_hash, password):
            raise ValueError("Invalid credentials")

        member = self.member_repo.get_by_user_id(user.id)

        access_token = generate_access_token(user)

        return {
            "user": user,
            "access_token": access_token,
            "member_id": member.id if member else None
        }