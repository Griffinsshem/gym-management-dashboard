from app.models.user import User
from .base import BaseRepository

class UserRepository(BaseRepository):
    model = User

    def get_by_email(self, email):
        return User.query.filter_by(email=email).first()