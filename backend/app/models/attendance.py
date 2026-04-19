from app.extensions import db
from .base import TimestampMixin


class Attendance(db.Model, TimestampMixin):
    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)

    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)

    check_in = db.Column(db.DateTime, nullable=False)
    check_out = db.Column(db.DateTime, nullable=True)

    status = db.Column(db.String(20), default="checked_in")  # checked_in, checked_out