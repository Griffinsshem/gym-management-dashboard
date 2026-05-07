from flask import Blueprint, request, jsonify
from app.services.notification_service import NotificationService
from app.utils.decorators import jwt_required

notifications_bp = Blueprint(
    "notifications",
    __name__,
    url_prefix="/api/v1/notifications"
)

notification_service = NotificationService()


@notifications_bp.route("", methods=["GET"])
@jwt_required
def get_notifications():
    try:
        user = request.user

        notifications = notification_service.get_notifications(user)

        return jsonify({
            "success": True,
            "data": notifications
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500