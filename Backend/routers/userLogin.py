from datetime import timedelta
from typing import Any

from fastapi import APIRouter, status, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from utils import schemas, database, token
from repository import users

router = APIRouter(tags=['User-Authentication'])

@router.post('/user/register')
async def create_user(request: schemas.User, db: Session = Depends(database.get_db)):
    return users.create(request, db)

@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user= users.authenticate(db, request)
    
    if not users.is_active(user):
            raise HTTPException(status_code=400, detail="Inactive user")
        
    if not user.user_role:
            role = "USER"
    else:
        role = user.user_role.role.name
    access_token = token.create_access_token(data={"email": user.email, "role":role})
    return {
        "access_token": access_token, 
            "token_type": "bearer"
            }
    
@router.post('/password-recovery/{email}', response_model=schemas.Msg)
def user_recover_password(email: str, db: Session = Depends(database.get_db)) -> Any:
     return users.passwordRecover(email, db)

@router.post('/reset-password/', response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session =Depends(database.get_db),
) -> Any:
    return users.passwordReset(token, new_password, db)