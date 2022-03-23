from fastapi import APIRouter, Depends, status
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas
from app.repository import admin
from typing import List

router = APIRouter(
    prefix = '/admin',
    tags = ['Admins']
)
get_db = database.get_db

@router.post('/')
async  def create_admin(request: schemas.Admin, db: Session = Depends(get_db)):
    return admin.create(request, db)

@router.get('/{id}', response_model=schemas.ShowAdmin)
async def get_admin(id: int, db: Session = Depends(get_db)):
    return admin.show(id, db)

@router.get('/',  response_model=List[schemas.ShowAdmin]  )
async def all(db: Session = Depends(get_db)):
    return admin.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowAdmin)
async def update(id: int, request: schemas.ShowAdmin, db: Session = Depends(get_db)):
    return admin.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return admin.destroy(id, db)