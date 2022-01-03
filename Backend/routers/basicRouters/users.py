from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas, oauth2
from repository import users
from typing import List

router = APIRouter(
    prefix = '/user',
    tags = ['Users']
)
get_db = database.get_db

@router.post('/')
async def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return users.create(request, db)

@router.get('/{id}', response_model=schemas.ShowUser)
async def get_user(id: int, db: Session = Depends(get_db)):
    return users.show(id, db)

@router.get('/',  response_model=List[schemas.User]  )
async def all(db: Session = Depends(get_db)):
    return users.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowUser)
async def update(id: int, request: schemas.ShowUser, db: Session = Depends(get_db),  current_user: schemas.User = Depends(oauth2.get_current_user)):
    return users.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return users.destroy(id, db)
