from app.repositories.membership_plan_repository import MembershipPlanRepository

class MembershipPlanService:
    def __init__(self):
        self.repo = MembershipPlanRepository()

    def create_plan(self, name, price, duration_days):
        return self.repo.create({
            "name": name,
            "price": price,
            "duration_days": duration_days
        })

    def get_plans(self):
        return self.repo.get_all()