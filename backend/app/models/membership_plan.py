from app.extensions import db
from .base import TimestampMixin

class MembershipPlan(db.Model, TimestampMixin):
    __tablename__ = "membership_plans"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    price_kes = db.Column(db.Float, nullable=False)
    duration_days = db.Column(db.Integer, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    subscriptions = db.relationship("MembershipSubscription", back_populates="plan", lazy=True)