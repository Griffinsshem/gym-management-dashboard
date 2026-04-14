from app import db
from .base import TimestampMixin
import enum

class UserRole(enum.Enum):
    admin = "admin"
    staff = "staff"
    member = "member"

class User(db.Model, TimestampMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.member)
    is_active = db.Column(db.Boolean, default=True)