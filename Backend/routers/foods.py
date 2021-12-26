from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas
from repository import foods
from typing import List

router = APIRouter(
    prefix = '/food',
    tags = ['Foods']
)
get_db = database.get_db

@router.post('/')
def create_food(request: schemas.Food, db: Session = Depends(get_db)):
    return foods.create(request, db)

@router.get('/{id}', response_model=schemas.ShowFood)
def get_food(id: int, db: Session = Depends(get_db)):
    return foods.show(id, db)

@router.get('/',  response_model=List[schemas.ShowFood]  )
def all(db: Session = Depends(get_db)):
    return foods.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.Food)
def update(id: int, request: schemas.Food, db: Session = Depends(get_db)):
    return foods.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
def destroy(id: int, db: Session = Depends(get_db)):
    return foods.destroy(id, db)
