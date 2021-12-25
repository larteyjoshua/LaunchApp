from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas
from repository import riders
from typing import List

router = APIRouter(
    prefix = '/rider',
    tags = ['Riders']
)
get_db = database.get_db

@router.post('/')
def create_rider(request: schemas.Rider, db: Session = Depends(get_db)):
    return riders.create(request, db)

@router.get('/{id}', response_model=schemas.ShowRider)
def get_rider(id: int, db: Session = Depends(get_db)):
    return riders.show(id, db)

@router.get('/',  response_model=List[schemas.ShowRider]  )
def all(db: Session = Depends(get_db)):
    return riders.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.Rider)
def update(id: int, request: schemas.Rider, db: Session = Depends(get_db)):
    return riders.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db)):
    return riders.destroy(id, db)
