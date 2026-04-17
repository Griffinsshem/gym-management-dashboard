from app.repositories.membership_plan_repository import MembershipPlanRepository


class MembershipPlanService:

    def __init__(self):
        self.plan_repo = MembershipPlanRepository()

    def create_plan(self, name, description, price_kes, duration_days):
        # Basic validation
        if not name or price_kes <= 0 or duration_days <= 0:
            raise ValueError("Invalid plan data")

        plan = self.plan_repo.create({
            "name": name,
            "description": description,
            "price_kes": price_kes,
            "duration_days": duration_days
        })

        return plan

    def get_plans(self):
        return self.plan_repo.get_all()

    def get_plan(self, plan_id):
        plan = self.plan_repo.get_by_id(plan_id)

        if not plan:
            raise ValueError("Plan not found")

        return plan

    def update_plan(self, plan_id, data):
        plan = self.plan_repo.get_by_id(plan_id)

        if not plan:
            raise ValueError("Plan not found")

        return self.plan_repo.update(plan, data)

    def deactivate_plan(self, plan_id):
        plan = self.plan_repo.get_by_id(plan_id)

        if not plan:
            raise ValueError("Plan not found")

        return self.plan_repo.deactivate(plan)