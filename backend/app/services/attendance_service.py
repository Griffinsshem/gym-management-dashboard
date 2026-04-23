from datetime import datetime
from app.repositories.attendance_repository import AttendanceRepository
from app.repositories.member_repository import MemberRepository


class AttendanceService:
    def __init__(self):
        self.attendance_repo = AttendanceRepository()
        self.member_repo = MemberRepository()

    def check_in(self, member_id):
        member = self.member_repo.get_by_id(member_id)
        if not member:
            raise ValueError("Member not found")

        existing = self.attendance_repo.get_active_check_in(member_id)
        if existing:
            raise ValueError("Member already checked in")

        attendance = self.attendance_repo.create({
            "member_id": member_id,
            "check_in_time": datetime.utcnow()
        })

        return attendance

    def check_out(self, member_id):
        attendance = self.attendance_repo.get_active_check_in(member_id)

        if not attendance:
            raise ValueError("No active check-in found")

        attendance.check_out_time = datetime.utcnow()
        self.attendance_repo.update(attendance, {})

        return attendance

    def get_member_attendance(self, member_id):
        member = self.member_repo.get_by_id(member_id)
        if not member:
            raise ValueError("Member not found")

        records = self.attendance_repo.get_by_member(member_id)

        return [
            {
                "id": r.id,
                "check_in_time": r.check_in_time.isoformat() if r.check_in_time else None,
                "check_out_time": r.check_out_time.isoformat() if r.check_out_time else None
            }
            for r in records
        ]