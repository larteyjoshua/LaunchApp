from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas, oauth2
from repository import users, orders
from typing import List


router = APIRouter(
    prefix = '/user',
    tags = ['Users']
)
get_db = database.get_db

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowUser)
async def update(id: int, request: schemas.ShowUser, db: Session = Depends(get_db),  current_user: schemas.User = Depends(oauth2.get_current_user)):
    return users.update(id, request, db)

@router.get('/detials', response_model=schemas.ShowUser)
async def get_user( db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return users.show(current_user.id, db)


@router.post('/order')
async def create_order(request: schemas.Order, db: Session = Depends(get_db)):
    return orders.create(request, db)

@router.get('/order/{id}', response_model=schemas.ShowOrder)
async def get_user(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return orders.show(id, db)

@router.get('order/all',  response_model=List[schemas.ShowOrder]  )
async def all_by_user(db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return orders.get_all_by_user(db, current_user.id)

@router.put('/order/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowOrder, )
async def update(id: int, request: schemas.ShowOrder, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return orders.update(id, request, db)

@router.delete('/order/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    return orders.destroy(id, db)