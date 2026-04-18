from app.models import Member
from app.repositories.base import BaseRepository


class MemberRepository(BaseRepository):
    model = Member

    def get_all(self):
        return Member.query.filter_by(is_active=True).all()

    def get_by_id(self, member_id):
        return Member.query.filter_by(id=member_id, is_active=True).first()

    def get_by_phone(self, phone):
        return Member.query.filter_by(phone=phone).first()

    def create(self, data):
        member = Member(**data)
        self.db.session.add(member)
        self.db.session.commit()
        return member

    def update(self, member, data):
        for key, value in data.items():
            setattr(member, key, value)

        self.db.session.commit()
        return member

    def deactivate(self, member):
        member.is_active = False
        self.db.session.commit()
        return member