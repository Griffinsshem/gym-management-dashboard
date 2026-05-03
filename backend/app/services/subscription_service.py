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

    def _format_subscription(self, sub):
        return {
            "id": sub.id,
            "member_id": sub.member_id,
            "member_name": sub.member.full_name if sub.member else None,
            "plan_id": sub.plan_id,
            "plan_name": sub.plan.name if sub.plan else None,
            "status": sub.status.value,
            "start_date": sub.start_date.isoformat() if sub.start_date else None,
            "end_date": sub.end_date.isoformat() if sub.end_date else None
        }

    def get_subscriptions(self):
        subs = self.subscription_repo.get_all()
        return [self._format_subscription(s) for s in subs]

    def get_subscription(self, subscription_id):
        subscription = self.subscription_repo.get_by_id(subscription_id)
        if not subscription:
            raise ValueError("Subscription not found")

        return self._format_subscription(subscription)

    def get_member_subscriptions(self, member_id):
        subs = self.subscription_repo.get_by_member(member_id)
        return [self._format_subscription(s) for s in subs]

    def cancel_subscription(self, subscription_id):
        subscription = self.subscription_repo.get_by_id(subscription_id)
        if not subscription:
            raise ValueError("Subscription not found")

        subscription.status = SubscriptionStatus.cancelled
        self.subscription_repo.update(subscription)

        return subscription

    def get_dashboard_stats(self):
        subscriptions = self.subscription_repo.get_all()

        total_revenue = 0
        active_count = 0
        expiring_soon = 0

        now = datetime.utcnow()
        next_7_days = now + timedelta(days=7)

        for sub in subscriptions:
            if sub.status == SubscriptionStatus.active:
                active_count += 1

                if sub.plan:
                    total_revenue += sub.plan.price_kes

                if sub.end_date and now <= sub.end_date <= next_7_days:
                    expiring_soon += 1

        return {
            "total_revenue": total_revenue,
            "active_subscriptions": active_count,
            "expiring_soon": expiring_soon,
        }

    def get_expiring_soon(self, days=7):
        subs = self.subscription_repo.get_expiring_soon(days)
        return [self._format_subscription(s) for s in subs]