from app.models.user import User, UserRole
from .base import BaseRepository


class UserRepository(BaseRepository):
    model = User

    def get_by_email(self, email):
        return User.query.filter_by(email=email).first()

    def get_staff_users(self):
        return User.query.filter_by(
            role=UserRole.staff
        ).order_by(User.id.desc()).all()