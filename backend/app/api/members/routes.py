from flask import Blueprint, request, jsonify
from app.services.member_service import MemberService
from app.utils.decorators import require_auth

member_bp = Blueprint("members", __name__, url_prefix="/api/v1/members")
member_service = MemberService()


@member_bp.route("", methods=["POST"])
def create_member():
    data = request.get_json()

    try:
        member = member_service.create_member(data)

        return jsonify({
            "success": True,
            "data": {
                "id": member.id,
                "first_name": member.first_name,
                "last_name": member.last_name
            }
        }), 201

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


@member_bp.route("", methods=["GET"])
@require_auth
def list_members():
    members = member_service.list_members()

    return jsonify({
        "success": True,
        "data": [
            {
                "id": m.id,
                "first_name": m.first_name,
                "last_name": m.last_name
            } for m in members
        ]
    })


@member_bp.route("/<int:id>", methods=["GET"])
@require_auth
def get_member(id):
    try:
        member = member_service.get_member(id)

        return jsonify({
            "success": True,
            "data": {
                "id": member.id,
                "first_name": member.first_name,
                "last_name": member.last_name
            }
        })

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 404


@member_bp.route("/<int:id>", methods=["PATCH"])
@require_auth
def update_member(id):
    data = request.get_json()

    try:
        member = member_service.update_member(id, data)

        return jsonify({
            "success": True,
            "data": {
                "id": member.id
            }
        })

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 404


@member_bp.route("/<int:id>", methods=["DELETE"])
@require_auth
def delete_member(id):
    try:
        member_service.deactivate_member(id)

        return jsonify({
            "success": True,
            "message": "Member deactivated"
        })

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 404