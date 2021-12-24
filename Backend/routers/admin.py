from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas
from repository import admin
from typing import List

router = APIRouter(
    prefix = '/admin',
    tags = ['admin']
)
get_db = database.get_db

@router.post('/')
def create_admin(request: schemas.Admin, db: Session = Depends(get_db)):
    return admin.create(request, db)

@router.get('/{id}', response_model=schemas.ShowAdmin)
def get_admin(id: int, db: Session = Depends(get_db)):
    return admin.show(id, db)

@router.get('/',  response_model=List[schemas.Admin]  )
def all(db: Session = Depends(get_db)):
    return admin.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowAdmin)
def update(id: int, request: schemas.ShowAdmin, db: Session = Depends(get_db)):
    return admin.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db)):
    return admin.destroy(id, db)