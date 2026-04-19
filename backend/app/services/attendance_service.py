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

        attendance = self.attendance_repo.create({
            "member_id": member_id,
            "check_in_time": datetime.utcnow()
        })

        return attendance

    def get_member_attendance(self, member_id):
        member = self.member_repo.get_by_id(member_id)
        if not member:
            raise ValueError("Member not found")

        return self.attendance_repo.get_by_member(member_id)