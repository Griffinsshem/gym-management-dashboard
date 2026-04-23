from datetime import datetime, timedelta
from app.models import MembershipSubscription, SubscriptionStatus
from app.repositories.subscription_repository import SubscriptionRepository
from app.repositories.member_repository import MemberRepository
from app.repositories.membership_plan_repository import MembershipPlanRepository


class SubscriptionService:
    def __init__(self):
        self.subscription_repo = SubscriptionRepository()
        self.member_repo = MemberRepository()
        self.plan_repo = MembershipPlanRepository()

    def create_subscription(self, member_id, plan_id):
        member = self.member_repo.get_by_id(member_id)
        if not member:
            raise ValueError("Member not found")

        plan = self.plan_repo.get_by_id(plan_id)
        if not plan or not plan.is_active:
            raise ValueError("Invalid or inactive plan")

        start_date = datetime.utcnow()
        end_date = start_date + timedelta(days=plan.duration_days)

        subscription = MembershipSubscription(
            member_id=member_id,
            plan_id=plan_id,
            start_date=start_date,
            end_date=end_date,
            status=SubscriptionStatus.active
        )

        return self.subscription_repo.create(subscription)

    def get_subscriptions(self):
        return self.subscription_repo.get_all()

    def get_subscription(self, subscription_id):
        subscription = self.subscription_repo.get_by_id(subscription_id)
        if not subscription:
            raise ValueError("Subscription not found")
        return subscription

    def get_member_subscriptions(self, member_id):
        return self.subscription_repo.get_by_member(member_id)

    def cancel_subscription(self, subscription_id):
        subscription = self.get_subscription(subscription_id)

        subscription.status = SubscriptionStatus.cancelled
        self.subscription_repo.update(subscription)

        return subscription