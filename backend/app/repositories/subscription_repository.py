from datetime import datetime, timedelta
from app.models import MembershipSubscription, SubscriptionStatus
from app.extensions import db
from sqlalchemy.orm import joinedload


class SubscriptionRepository:

    def create(self, subscription):
        db.session.add(subscription)
        db.session.commit()
        return subscription

    def get_by_id(self, subscription_id):
        return db.session.get(MembershipSubscription, subscription_id)

    def get_all(self):
        return MembershipSubscription.query.options(
            joinedload(MembershipSubscription.member),
            joinedload(MembershipSubscription.plan)
        ).all()

    def get_by_member(self, member_id):
        return MembershipSubscription.query.options(
            joinedload(MembershipSubscription.member),
            joinedload(MembershipSubscription.plan)
        ).filter_by(member_id=member_id).all()

    def update(self, subscription):
        db.session.commit()
        return subscription

    def get_expiring_soon(self, days=7):
        now = datetime.utcnow()
        threshold = now + timedelta(days=days)

        return MembershipSubscription.query.options(
            joinedload(MembershipSubscription.member),
            joinedload(MembershipSubscription.plan)
        ).filter(
            MembershipSubscription.status == SubscriptionStatus.active,
            MembershipSubscription.end_date >= now,
            MembershipSubscription.end_date <= threshold
        ).all()