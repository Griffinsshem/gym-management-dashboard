from flask import Blueprint, request, jsonify
from app.services.attendance_service import AttendanceService
from app.utils.decorators import jwt_required

attendance_bp = Blueprint("attendance", __name__, url_prefix="/api/v1/attendance")

attendance_service = AttendanceService()


# Check-in member
@attendance_bp.route("/check-in", methods=["POST"])
@jwt_required
def check_in():
    data = request.get_json()

    try:
        attendance = attendance_service.check_in(
            member_id=data.get("member_id")
        )

        return jsonify({
            "success": True,
            "data": {
                "id": attendance.id,
                "member_id": attendance.member_id,
                "check_in_time": attendance.check_in_time
            }
        }), 201

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


# Get attendance for a member
@attendance_bp.route("/member/<int:member_id>", methods=["GET"])
@jwt_required
def get_member_attendance(member_id):
    try:
        records = attendance_service.get_member_attendance(member_id)

        return jsonify({
            "success": True,
            "data": [
                {
                    "id": r.id,
                    "member_id": r.member_id,
                    "check_in_time": r.check_in_time
                } for r in records
            ]
        })

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 404


@attendance_bp.route("/check-out", methods=["POST"])
@jwt_required
def check_out():
    data = request.get_json()

    try:
        attendance = attendance_service.check_out(
            member_id=data.get("member_id")
        )

        return jsonify({
            "success": True,
            "data": {
                "id": attendance.id,
                "member_id": attendance.member_id,
                "check_out_time": attendance.check_out_time
            }
        })

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400
    

@attendance_bp.route("/member/<int:member_id>", methods=["GET"])
@jwt_required
def get_member_attendance(member_id):
    try:
        records = attendance_service.get_member_attendance(member_id)

        return jsonify({
            "success": True,
            "data": records
        })

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 404