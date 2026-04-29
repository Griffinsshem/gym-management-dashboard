from app import create_app
from flask_cors import CORS
from app.extensions import db

app = create_app()

CORS(app, resources={r"/api/*": {"origins": "*"}})

with app.app_context():
    print("====================================")
    print("DB URL:", db.engine.url)
    print("====================================")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)