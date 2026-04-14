from app.repositories.user_repository import UserRepository
from app.extensions import bcrypt

class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    def register_user(self, email, password, role="member"):
        # Check if user exists
        existing_user = self.user_repo.get_by_email(email)
        if existing_user:
            raise ValueError("User already exists")

        # Hash password
        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create user
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

        return user