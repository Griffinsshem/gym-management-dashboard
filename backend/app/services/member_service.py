from app.repositories.member_repository import MemberRepository
from datetime import datetime

class MemberService:
    def __init__(self):
        self.member_repo = MemberRepository()

    def create_member(self, data):
        data["joined_at"] = datetime.utcnow()
        return self.member_repo.create(data)

    def get_member(self, member_id):
        member = self.member_repo.get_by_id(member_id)
        if not member:
            raise ValueError("Member not found")
        return member

    def update_member(self, member_id, data):
        member = self.get_member(member_id)
        return self.member_repo.update(member, data)

    def deactivate_member(self, member_id):
        member = self.get_member(member_id)
        return self.member_repo.update(member, {"is_active": False})

    def list_members(self):
        return self.member_repo.get_all()