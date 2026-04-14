import os

class BaseConfig:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "super-secret")
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True
    }

class DevelopmentConfig(BaseConfig):
    DEBUG = True

class ProductionConfig(BaseConfig):
    DEBUG = False

class TestingConfig(BaseConfig):
    TESTING = True