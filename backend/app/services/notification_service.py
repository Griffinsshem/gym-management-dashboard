from datetime import datetime
from app.services.subscription_service import SubscriptionService


class NotificationService:
    def __init__(self):
        self.subscription_service = SubscriptionService()

    def get_notifications(self, user):
        notifications = []

        #  EXPIRING SUBSCRIPTIONS (ADMIN + STAFF)
        if user.get("role") in ["admin", "staff"]:
            expiring = self.subscription_service.get_expiring_soon(7)

            for sub in expiring:
                notifications.append({
                    "id": f"exp-{sub['id']}",
                    "type": "warning",
                    "message": f"{sub['member_name'] or 'Member'} subscription expires soon",
                    "date": sub["end_date"],
                })

        #  MEMBER PERSONAL NOTIFICATION
        if user.get("role") == "member":
            member_id = user.get("member_id")

            subs = self.subscription_service.get_member_subscriptions(member_id)

            for sub in subs:
                if sub["status"] == "active":
                    notifications.append({
                        "id": f"self-{sub['id']}",
                        "type": "info",
                        "message": f"Your {sub['plan_name']} plan is active",
                        "date": sub["end_date"],
                    })

        return notifications