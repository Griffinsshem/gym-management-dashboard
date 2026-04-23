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

        # Hash password
        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create user
        user = self.user_repo.create({
            "email": email,
            "password_hash": password_hash,
            "role": role
        })

        member = self.member_repo.create({
            "full_name": email.split("@")[0],
            "email": email,
            "phone": f"07{user.id:08d}"
        })

        return user

    def login_user(self, email, password):
        user = self.user_repo.get_by_email(email)

        if not user:
            raise ValueError("Invalid credentials")

        if not bcrypt.check_password_hash(user.password_hash, password):
            raise ValueError("Invalid credentials")

        member = self.member_repo.model.query.filter_by(
            email=email,
            is_active=True
        ).first()

        access_token = generate_access_token(user)

        return {
            "user": user,
            "access_token": access_token,
            "member_id": member.id if member else None
        }