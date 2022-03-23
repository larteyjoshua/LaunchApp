from fastapi import APIRouter, Depends, status
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas
from app.repository import foods
from typing import List

router = APIRouter(
    prefix = '/food',
    tags = ['Foods']
)
get_db = database.get_db

@router.post('/')
async def create_food(request: schemas.Food, db: Session = Depends(get_db)):
    return foods.create(request, db)

@router.get('/{id}', response_model=schemas.ShowFood)
async def get_food(id: int, db: Session = Depends(get_db)):
    return foods.show(id, db)

@router.get('/',  response_model=List[schemas.ShowFood]  )
async def all(db: Session = Depends(get_db)):
    return foods.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.Food)
async def update(id: int, request: schemas.Food, db: Session = Depends(get_db)):
    return foods.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return foods.destroy(id, db)
