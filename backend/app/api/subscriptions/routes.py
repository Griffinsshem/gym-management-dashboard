from flask import Blueprint, request, jsonify
from app.services.subscription_service import SubscriptionService
from app.utils.decorators import jwt_required, require_role

subscriptions_bp = Blueprint("subscriptions", __name__, url_prefix="/api/v1/subscriptions")

subscription_service = SubscriptionService()


@subscriptions_bp.route("", methods=["POST"])
@jwt_required
@require_role("admin")
def create_subscription():
    data = request.get_json()

    try:
        sub = subscription_service.create_subscription(
            member_id=data.get("member_id"),
            plan_id=data.get("plan_id")
        )

        return jsonify({
            "success": True,
            "data": {
                "id": sub.id,
                "member_id": sub.member_id,
                "plan_id": sub.plan_id,
                "status": sub.status.value
            }
        }), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


@subscriptions_bp.route("", methods=["GET"])
@jwt_required
def get_subscriptions():
    subs = subscription_service.get_subscriptions()

    return jsonify({
        "success": True,
        "data": [
            {
                "id": s.id,
                "member_id": s.member_id,
                "plan_id": s.plan_id,
                "status": s.status.value,
                "start_date": s.start_date,
                "end_date": s.end_date
            }
            for s in subs
        ]
    })


@subscriptions_bp.route("/<int:sub_id>", methods=["GET"])
@jwt_required
def get_subscription(sub_id):
    try:
        s = subscription_service.get_subscription(sub_id)

        return jsonify({
            "success": True,
            "data": {
                "id": s.id,
                "member_id": s.member_id,
                "plan_id": s.plan_id,
                "status": s.status.value,
                "start_date": s.start_date,
                "end_date": s.end_date
            }
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 404


@subscriptions_bp.route("/member/<int:member_id>", methods=["GET"])
@jwt_required
def get_member_subscriptions(member_id):
    subs = subscription_service.get_member_subscriptions(member_id)

    return jsonify({
        "success": True,
        "data": [
            {
                "id": s.id,
                "plan_id": s.plan_id,
                "status": s.status.value
            }
            for s in subs
        ]
    })


@subscriptions_bp.route("/<int:sub_id>/cancel", methods=["PATCH"])
@jwt_required
@require_role("admin")
def cancel_subscription(sub_id):
    try:
        s = subscription_service.cancel_subscription(sub_id)

        return jsonify({
            "success": True,
            "message": "Subscription cancelled",
            "data": {
                "id": s.id,
                "status": s.status.value
            }
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400
    
@subscriptions_bp.route("/dashboard/stats", methods=["GET"])
@jwt_required
def get_dashboard_stats():
    try:
        stats = subscription_service.get_dashboard_stats()

        return jsonify({
            "success": True,
            "data": stats
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
    

@subscriptions_bp.route("/expiring", methods=["GET"])
@jwt_required
def get_expiring_subscriptions():
    try:
        subs = subscription_service.get_expiring_soon()

        return jsonify({
            "success": True,
            "data": [
                {
                    "id": s.id,
                    "member_id": s.member_id,
                    "plan_id": s.plan_id,
                    "end_date": s.end_date,
                    "status": s.status.value
                }
                for s in subs
            ]
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400