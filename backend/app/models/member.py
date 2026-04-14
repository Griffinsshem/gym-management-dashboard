from app.extensions import db
from .base import TimestampMixin

class Member(db.Model, TimestampMixin):
    __tablename__ = "members"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    date_of_birth = db.Column(db.Date)
    emergency_contact = db.Column(db.String(120))

    joined_at = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)