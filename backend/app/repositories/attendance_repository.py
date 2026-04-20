from app.models import Attendance
from app.repositories.base import BaseRepository


class AttendanceRepository(BaseRepository):
    model = Attendance

    def get_by_member(self, member_id):
        return self.model.query.filter_by(member_id=member_id).all()

    def get_active_check_in(self, member_id):
        return self.model.query.filter_by(
            member_id=member_id,
            check_out_time=None
        ).first()