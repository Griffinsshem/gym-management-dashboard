from flask import Blueprint, request
from app.services.attendance_service import AttendanceService
from app.utils.decorators import jwt_required
from app.utils.response import success_response, error_response

attendance_bp = Blueprint("attendance", __name__, url_prefix="/api/v1/attendance")

attendance_service = AttendanceService()


@attendance_bp.route("/check-in", methods=["POST"])
@jwt_required
def check_in():
    data = request.get_json()

    if not data or not data.get("member_id"):
        return error_response("member_id is required", "BAD_REQUEST", 400)

    try:
        attendance = attendance_service.check_in(
            member_id=data.get("member_id")
        )

        return success_response(
            data={
                "id": attendance.id,
                "member_id": attendance.member_id,
                "check_in_time": attendance.check_in_time.isoformat()
            },
            message="Check-in successful"
        ), 201

    except ValueError as e:
        return error_response(str(e), "CHECKIN_ERROR", 400)


@attendance_bp.route("/check-out", methods=["POST"])
@jwt_required
def check_out():
    data = request.get_json()

    if not data or not data.get("member_id"):
        return error_response("member_id is required", "BAD_REQUEST", 400)

    try:
        attendance = attendance_service.check_out(
            member_id=data.get("member_id")
        )

        return success_response(
            data={
                "id": attendance.id,
                "member_id": attendance.member_id,
                "check_out_time": attendance.check_out_time.isoformat()
            },
            message="Check-out successful"
        )

    except ValueError as e:
        return error_response(str(e), "CHECKOUT_ERROR", 400)


@attendance_bp.route("/member/<int:member_id>", methods=["GET"])
@jwt_required
def get_member_attendance(member_id):
    try:
        records = attendance_service.get_member_attendance(member_id)

        return success_response(
            data=records,
            message="Attendance fetched successfully"
        )

    except ValueError as e:
        return error_response(str(e), "NOT_FOUND", 404)