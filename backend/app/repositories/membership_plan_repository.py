from app.models import MembershipPlan
from app.extensions import db


class MembershipPlanRepository:
    
    def create(self, data):
        plan = MembershipPlan(**data)
        db.session.add(plan)
        db.session.commit()
        return plan

    def get_all(self, active_only=True):
        query = MembershipPlan.query

        if active_only:
            query = query.filter_by(is_active=True)

        return query.all()

    def get_by_id(self, plan_id):
        return MembershipPlan.query.get(plan_id)

    def update(self, plan, data):
        for key, value in data.items():
            setattr(plan, key, value)

        db.session.commit()
        return plan

    def deactivate(self, plan):
        plan.is_active = False
        db.session.commit()
        return plan