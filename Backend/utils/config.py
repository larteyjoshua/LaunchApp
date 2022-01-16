from functools import lru_cache
from typing import Any, Dict, Optional

from pydantic import BaseSettings, PostgresDsn, validator


class Settings(BaseSettings):
    PROJECT_NAME: str = "LaunchApp"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = ""
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM:str = ""
    USERS_OPEN_REGISTRATION: Optional[int] = None
    ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg') 
    ENVIRONMENT: Optional[str]

    FIRST_SUPER_ADMIN_EMAIL: str = ""
    FIRST_SUPER_ADMIN_PASSWORD: str  = ""
    
    AWS_ACCESS_KEY_ID: str=''
    AWS_SECRET_ACCESS_KEY=""
    REGION_NAME: str = 'us-east-2'
    SIGNATURE_VERSION: str='s3v4'
    BUCKET_NAME: str ="launchapp-images"

    SQLALCHEMY_DATABASE_URI: str = ""

    class Config:
        case_sensitive = True
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()