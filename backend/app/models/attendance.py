from app.extensions import db
from .base import TimestampMixin

class AttendanceLog(db.Model, TimestampMixin):
    __tablename__ = "attendance_logs"

    id = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)

    checked_in_at = db.Column(db.DateTime, nullable=False)
    checked_out_at = db.Column(db.DateTime)