from flask import Blueprint, jsonify
from app.utils.decorators import jwt_required

plans_bp = Blueprint("plans", __name__, url_prefix="/api/v1/plans")

PLANS = [
    {"id": 1, "name": "Basic Plan", "price": 1000},
    {"id": 2, "name": "Pro Plan", "price": 2000},
    {"id": 3, "name": "Premium Plan", "price": 3000},
]


@plans_bp.route("", methods=["GET"])
@jwt_required
def get_plans():
    return jsonify({
        "success": True,
        "data": PLANS
    })