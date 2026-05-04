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

        # use service formatter
        formatted = subscription_service._format_subscription(sub)

        return jsonify({
            "success": True,
            "data": formatted
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
        "data": subs
    })


@subscriptions_bp.route("/<int:sub_id>", methods=["GET"])
@jwt_required
def get_subscription(sub_id):
    try:
        sub = subscription_service.get_subscription(sub_id)

        return jsonify({
            "success": True,
            "data": sub
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 404


@subscriptions_bp.route("/member/<int:member_id>", methods=["GET"])
@jwt_required
def get_member_subscriptions(member_id):
    subs = subscription_service.get_member_subscriptions(member_id)

    return jsonify({
        "success": True,
        "data": subs
    })


@subscriptions_bp.route("/<int:sub_id>/cancel", methods=["PATCH"])
@jwt_required
@require_role("admin")
def cancel_subscription(sub_id):
    try:
        sub = subscription_service.cancel_subscription(sub_id)

        return jsonify({
            "success": True,
            "message": "Subscription cancelled",
            "data": sub
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


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
            "data": subs
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400