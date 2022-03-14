import os
from functools import lru_cache
from typing import Any, Dict, Optional

from pydantic import BaseSettings, AnyHttpUrl, validator
import secrets
 

class Settings(BaseSettings):
    PROJECT_NAME: str = "LunchApp"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str =  secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    ALGORITHM:str = 
    USERS_OPEN_REGISTRATION: Optional[int] = None
    ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg') 
    ENVIRONMENT: Optional[str]
    SERVER_HOST: str = 

    FIRST_SUPER_ADMIN_EMAIL: str = 
    FIRST_SUPER_ADMIN_PASSWORD: str  = ""
    
    AWS_ACCESS_KEY_ID: str=
    AWS_SECRET_ACCESS_KEY=
    REGION_NAME: str = 'us-east-2'
    SIGNATURE_VERSION: str='s3v4'
    BUCKET_NAME: str ="lunchapp-images"
    SENDGRID_API_KEY: str= 

    SQLALCHEMY_DATABASE_URI: str = "postgresql://postgres:12345678@localhost:5432/launchapp"
    
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48

    class Config:
        case_sensitive = True
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()