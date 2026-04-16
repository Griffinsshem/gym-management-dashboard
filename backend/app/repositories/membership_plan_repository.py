from app.models import MembershipPlan
from app.extensions import db

class MembershipPlanRepository:
    def create(self, data):
        plan = MembershipPlan(**data)
        db.session.add(plan)
        db.session.commit()
        return plan

    def get_all(self):
        return MembershipPlan.query.all()