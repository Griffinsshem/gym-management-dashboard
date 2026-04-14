from app.extensions import db
from .base import TimestampMixin

class AuditLog(db.Model, TimestampMixin):
    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True)

    actor_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    action = db.Column(db.String(120), nullable=False)

    entity_type = db.Column(db.String(120))
    entity_id = db.Column(db.Integer)

    old_value = db.Column(db.JSON)
    new_value = db.Column(db.JSON)