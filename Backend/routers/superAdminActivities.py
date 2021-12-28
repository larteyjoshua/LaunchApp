from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas
from repository import admin, company, roles, users, riders, foods, account, orders, feedbacks
from typing import List


router = APIRouter(
    prefix = '/admin',
    tags = ['Super Admin']
)
get_db = database.get_db

@router.delete('/admin/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return admin.destroy(id, db)

@router.delete('/role/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return roles.destroy(id, db)

@router.delete('/company/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return company.destroy(id, db)

@router.delete('/user/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return users.destroy(id, db)

@router.delete('/rider/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return riders.destroy(id, db)

@router.delete('/food/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return foods.destroy(id, db)

@router.delete('/account/{id}', status_code=status.HTTP_204_NO_CONTENT)
async  def destroy(id: int, db: Session = Depends(get_db)):
    return account.destroy(id, db)

@router.delete('/order/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return orders.destroy(id, db)

@router.delete('/feedback/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return feedbacks.destroy(id, db)