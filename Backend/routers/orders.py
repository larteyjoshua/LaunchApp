from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas
from repository import orders
from typing import List

router = APIRouter(
    prefix = '/order',
    tags = ['Orders']
)
get_db = database.get_db

@router.post('/')
async def create_order(request: schemas.Order, db: Session = Depends(get_db)):
    return orders.create(request, db)

@router.get('/{id}', response_model=schemas.ShowOrder)
async def get_user(id: int, db: Session = Depends(get_db)):
    return orders.show(id, db)

@router.get('/',  response_model=List[schemas.ShowOrder]  )
async def all(db: Session = Depends(get_db)):
    return orders.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowOrder)
async def update(id: int, request: schemas.ShowOrder, db: Session = Depends(get_db)):
    return orders.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return orders.destroy(id, db)
