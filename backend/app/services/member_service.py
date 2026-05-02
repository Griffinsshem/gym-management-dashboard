from app.repositories.member_repository import MemberRepository
from app.repositories.subscription_repository import SubscriptionRepository


class MemberService:
    def __init__(self):
        self.member_repo = MemberRepository()
        self.subscription_repo = SubscriptionRepository()

    def create_member(self, user_id, full_name, phone, email=None, gender=None, date_of_birth=None):
        if not user_id:
            raise ValueError("User ID is required")

        if not full_name or not phone:
            raise ValueError("Full name and phone are required")

        existing = self.member_repo.get_by_phone(phone)
        if existing:
            raise ValueError("Member with this phone already exists")

        member = self.member_repo.create({
            "user_id": user_id,
            "full_name": full_name,
            "phone": phone,
            "email": email,
            "gender": gender,
            "date_of_birth": date_of_birth
        })

        return member

    def get_members(self):
        members = self.member_repo.get_all()

        result = []

        for m in members:
            subs = self.subscription_repo.get_by_member(m.id)

            active_sub = next(
                (s for s in subs if s.status.value == "active"),
                None
            )

            result.append({
                "id": m.id,
                "full_name": m.full_name,
                "phone": m.phone,
                "email": m.email,
                "gender": m.gender,
                "date_of_birth": m.date_of_birth,
                "active_plan": {
                    "id": active_sub.plan.id,
                    "name": active_sub.plan.name
                } if active_sub else None,
                "subscription_status": active_sub.status.value if active_sub else None
            })

        return result

    def get_member(self, member_id):
        member = self.member_repo.get_by_id(member_id)

        if not member:
            raise ValueError("Member not found")

        return member

    def update_member(self, member_id, data):
        member = self.member_repo.get_by_id(member_id)

        if not member:
            raise ValueError("Member not found")

        return self.member_repo.update(member, data)

    def deactivate_member(self, member_id):
        member = self.member_repo.get_by_id(member_id)

        if not member:
            raise ValueError("Member not found")

        return self.member_repo.deactivate(member)