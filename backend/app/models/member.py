from app.extensions import db
from .base import TimestampMixin


class Member(db.Model, TimestampMixin):
    __tablename__ = "members"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    gender = db.Column(db.String(10))
    date_of_birth = db.Column(db.Date)
    is_active = db.Column(db.Boolean, default=True)

    subscriptions = db.relationship("MembershipSubscription", backref="member", lazy=True)