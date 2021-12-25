from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas
from repository import roles
from typing import List

router = APIRouter(
    prefix = '/role',
    tags = ['Roles']
)
get_db = database.get_db

@router.post('/')
def create_role(request: schemas.Role, db: Session = Depends(get_db)):
    return roles.create(request, db)

@router.get('/{id}', response_model=schemas.ShowRole)
def get_role(id: int, db: Session = Depends(get_db)):
    return roles.show(id, db)

@router.get('/',  response_model=List[schemas.ShowRole]  )
def all(db: Session = Depends(get_db)):
    return roles.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowRole)
def update(id: int, request: schemas.Role, db: Session = Depends(get_db)):
    return roles.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db)):
    return roles.destroy(id, db)
