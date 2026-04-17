from flask import Blueprint, request, jsonify
from app.services.membership_plan_service import MembershipPlanService
from app.utils.decorators import jwt_required, require_role

plans_bp = Blueprint("plans", __name__, url_prefix="/api/v1/plans")

plan_service = MembershipPlanService()

@plans_bp.route("", methods=["POST"])
@jwt_required
@require_role("admin")
def create_plan():
    data = request.get_json()

    plan = plan_service.create_plan(
        name=data.get("name"),
        price=data.get("price"),
        duration_days=data.get("duration_days")
    )

    return jsonify({
        "success": True,
        "data": {
            "id": plan.id,
            "name": plan.name,
            "price": plan.price
        }
    }), 201


@plans_bp.route("", methods=["GET"])
@jwt_required
def get_plans():
    plans = plan_service.get_plans()

    return jsonify({
        "success": True,
        "data": [
            {
                "id": p.id,
                "name": p.name,
                "price": p.price,
                "duration_days": p.duration_days
            } for p in plans
        ]
    })