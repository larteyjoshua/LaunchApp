from datetime import timedelta
from typing import Any

from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models import  models
from utils import schemas, database, adminToken
from utils.hashing import Hash
from repository import admin, roles

router = APIRouter(tags=['Admin-Authentication'])


@router.post('/adminLogin')
def adminLogin(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    admins = admin.get_by_email(db, request)
    print(admins)
    if not admins:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    elif not Hash.verify(admins.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect password")
        
    elif not admins.is_active(admins):
            raise HTTPException(status_code=400, detail="Inactive user")
    role = roles.show(admins.roleId, db)
    access_token = adminToken.create_access_token(data={"email": admins.email, "role": role.name})
    return {
        "access_token": access_token, 
            "token_type": "bearer"
            }