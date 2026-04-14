from app.models.member import Member
from .base import BaseRepository

class MemberRepository(BaseRepository):
    model = Member

    def get_active_members(self):
        return Member.query.filter_by(is_active=True).all()