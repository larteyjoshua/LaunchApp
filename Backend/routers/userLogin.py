from datetime import timedelta
from typing import Any

from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models import  models
from utils import schemas, database, token
from utils.hashing import Hash
from repository import users

router = APIRouter(tags=['User-Authentication'])

@router.post('user/register')
async def create_user(request: schemas.User, db: Session = Depends(database.get_db)):
    return users.create(request, db)

@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = users.get_by_email(db, request)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    elif not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect password")
        
    elif not users.is_active(user):
            raise HTTPException(status_code=400, detail="Inactive user")

    access_token = token.create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token, 
            "token_type": "bearer"
            }