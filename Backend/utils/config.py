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
    ALGORITHM:str = "HS256"
    USERS_OPEN_REGISTRATION: Optional[int] = None
    ALLOWED_EXTENSIONS = ('png', 'jpg', 'jpeg') 
    ENVIRONMENT: Optional[str]
    SERVER_HOST: str = 'http://localhost:8080'

    FIRST_SUPER_ADMIN_EMAIL: str = "superuser@lunchapp.com"
    FIRST_SUPER_ADMIN_PASSWORD: str  = ""
    
    AWS_ACCESS_KEY_ID: str='AKIAXZDSGWIS3LUAISGN'
    AWS_SECRET_ACCESS_KEY="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"
    REGION_NAME: str = 'us-east-2'
    SIGNATURE_VERSION: str='s3v4'
    BUCKET_NAME: str ="lunchapp-images"
    SENDGRID_API_KEY: str= "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"

    SQLALCHEMY_DATABASE_URI: str = "postgresql://postgres:12345678@localhost:5432/launchapp"
    
    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48

    class Config:
        case_sensitive = True
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()