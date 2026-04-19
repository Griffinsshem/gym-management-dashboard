from app.models import Attendance
from app.repositories.base import BaseRepository


class AttendanceRepository(BaseRepository):
    model = Attendance

    def get_by_member(self, member_id):
        return Attendance.query.filter_by(member_id=member_id).all()