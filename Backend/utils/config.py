from functools import lru_cache
from typing import Any, Dict, Optional

from pydantic import BaseSettings, PostgresDsn, validator


class Settings(BaseSettings):
    PROJECT_NAME: str = "LaunchApp"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM:str = "HS256"
    USERS_OPEN_REGISTRATION: Optional[int] = None

    ENVIRONMENT: Optional[str]

    FIRST_SUPER_ADMIN_EMAIL: str = "superuser@launchapp.com"
    FIRST_SUPER_ADMIN_PASSWORD: str  = "superpassword"


    SQLALCHEMY_DATABASE_URI: str = "postgresql://postgres:12345678@localhost:5432/launchapp"

    class Config:
        case_sensitive = True
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()