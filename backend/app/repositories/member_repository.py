from app.models import Member
from app.repositories.base import BaseRepository


class MemberRepository(BaseRepository):
    model = Member

    def get_all(self):
        return self.model.query.filter_by(is_active=True).all()

    def get_by_id(self, member_id):
        return self.model.query.filter_by(id=member_id, is_active=True).first()

    def get_by_phone(self, phone):
        return self.model.query.filter_by(phone=phone).first()

    def deactivate(self, member):
        member.is_active = False
        return self.update(member, {})