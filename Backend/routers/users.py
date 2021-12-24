from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas
from repository import users
from typing import List

router = APIRouter(
    prefix = '/user',
    tags = ['users']
)
get_db = database.get_db

@router.post('/')
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return users.create(request, db)

@router.get('/{id}', response_model=schemas.ShowUser)
def get_user(id: int, db: Session = Depends(get_db)):
    return users.show(id, db)

@router.get('/',  response_model=List[schemas.User]  )
def all(db: Session = Depends(get_db)):
    return users.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowUser)
def update(id: int, request: schemas.ShowUser, db: Session = Depends(get_db)):
    return users.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db)):
    return users.destroy(id, db)
