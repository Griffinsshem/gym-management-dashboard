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

    try:
        plan = plan_service.create_plan(
            name=data.get("name"),
            description=data.get("description"),
            price_kes=data.get("price_kes"),
            duration_days=data.get("duration_days")
        )

        return jsonify({
            "success": True,
            "data": {
                "id": plan.id,
                "name": plan.name,
                "price_kes": plan.price_kes
            }
        }), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400



@plans_bp.route("", methods=["GET"])
@jwt_required
def get_plans():
    plans = plan_service.get_plans()

    return jsonify({
        "success": True,
        "data": [
            {"id": 1, "name": "Basic Plan", "price": 1000},
            {"id": 2, "name": "Pro Plan", "price": 2000},
            {"id": 3, "name": "Premium Plan", "price": 3000}
        ]
    })



@plans_bp.route("/<int:plan_id>", methods=["GET"])
def get_plan(plan_id):
    try:
        plan = plan_service.get_plan(plan_id)

        return jsonify({
            "success": True,
            "data": {
                "id": plan.id,
                "name": plan.name,
                "price_kes": plan.price_kes,
                "duration_days": plan.duration_days
            }
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 404



@plans_bp.route("/<int:plan_id>", methods=["PATCH"])
@jwt_required
@require_role("admin")
def update_plan(plan_id):
    data = request.get_json()

    try:
        plan = plan_service.update_plan(plan_id, data)

        return jsonify({
            "success": True,
            "data": {
                "id": plan.id,
                "name": plan.name
            }
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400


@plans_bp.route("/<int:plan_id>", methods=["DELETE"])
@jwt_required
@require_role("admin")
def deactivate_plan(plan_id):
    try:
        plan_service.deactivate_plan(plan_id)

        return jsonify({
            "success": True,
            "message": "Plan deactivated"
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400