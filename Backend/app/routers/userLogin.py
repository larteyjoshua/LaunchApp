from datetime import timedelta
from typing import Any
from fastapi import APIRouter, status, Depends, HTTPException, Body, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.utils import schemas, database, token
from app.repository import users

router = APIRouter(tags=['User-Authentication'])

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
def user_recover_password(email: str, url: schemas.Resource, request: Request, db: Session = Depends(database.get_db)) -> Any:
    # #  port = request.url.port
    # port = request.client.port
    # host = request.client.host
    # print(request.client)
    # print(request.url)
    link = f"{url.url}/passwordRecover"
    return users.passwordRecover(email, db, link)

@router.post('/reset-password/', response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session =Depends(database.get_db)) -> Any:
    return users.passwordReset(token, new_password, db)