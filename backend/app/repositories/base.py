from app.extensions import db

class BaseRepository:
    model = None

    def get_all(self):
        return self.model.query.all()

    def get_by_id(self, id):
        return self.model.query.get(id)

    def create(self, data):
        instance = self.model(**data)
        db.session.add(instance)
        db.session.commit()
        return instance

    def update(self, instance, data):
        for key, value in data.items():
            setattr(instance, key, value)
        db.session.commit()
        return instance

    def delete(self, instance):
        db.session.delete(instance)
        db.session.commit()