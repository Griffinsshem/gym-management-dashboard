from app.repositories.member_repository import MemberRepository


class MemberService:
    def __init__(self):
        self.member_repo = MemberRepository()

    def create_member(self, full_name, phone, email=None, gender=None, date_of_birth=None):
        # validation
        if not full_name or not phone:
            raise ValueError("Full name and phone are required")

        # prevent duplicate phone
        existing = self.member_repo.get_by_phone(phone)
        if existing:
            raise ValueError("Member with this phone already exists")

        member = self.member_repo.create({
            "full_name": full_name,
            "phone": phone,
            "email": email,
            "gender": gender,
            "date_of_birth": date_of_birth
        })

        return member

    def get_members(self):
        return self.member_repo.get_all()

    def get_member(self, member_id):
        member = self.member_repo.get_by_id(member_id)

        if not member:
            raise ValueError("Member not found")

        return member

    def update_member(self, member_id, data):
        member = self.member_repo.get_by_id(member_id)

        if not member:
            raise ValueError("Member not found")

        return self.member_repo.update(member, data)

    def deactivate_member(self, member_id):
        member = self.member_repo.get_by_id(member_id)

        if not member:
            raise ValueError("Member not found")

        return self.member_repo.deactivate(member)