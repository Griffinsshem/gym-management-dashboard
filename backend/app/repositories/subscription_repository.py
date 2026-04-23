from app.models import MembershipSubscription
from app.extensions import db


class SubscriptionRepository:
    
    def create(self, subscription):
        db.session.add(subscription)
        db.session.commit()
        return subscription

    def get_by_id(self, subscription_id):
        return MembershipSubscription.query.get(subscription_id)

    def get_all(self):
        return MembershipSubscription.query.all()

    def get_by_member(self, member_id):
        return MembershipSubscription.query.filter_by(member_id=member_id).all()

    def update(self, subscription):
        db.session.commit()
        return subscription