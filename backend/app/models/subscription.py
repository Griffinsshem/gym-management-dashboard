from app.extensions import db
from .base import TimestampMixin
import enum


class SubscriptionStatus(enum.Enum):
    active = "active"
    expired = "expired"
    cancelled = "cancelled"


class MembershipSubscription(db.Model, TimestampMixin):
    __tablename__ = "subscriptions"

    id = db.Column(db.Integer, primary_key=True)

    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)
    plan_id = db.Column(db.Integer, db.ForeignKey("membership_plans.id"), nullable=False)

    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)

    status = db.Column(db.Enum(SubscriptionStatus), default=SubscriptionStatus.active)
    payment_reference = db.Column(db.String(120))

    plan = db.relationship(
        "MembershipPlan",
        back_populates="subscriptions"
    )