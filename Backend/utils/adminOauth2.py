from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from utils import adminToken
from sqlalchemy.orm import Session
from utils import database

get_db = database.get_db

adimn_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="adminLogin")


def get_current_admin(data: str = Depends(adimn_oauth2_scheme),  db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    return adminToken.verify_token(credentials_exception, data, db)