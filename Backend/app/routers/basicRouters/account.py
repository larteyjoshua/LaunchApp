from fastapi import APIRouter, Depends, status
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas
from app.repository import account
from typing import List

router = APIRouter(
    prefix = '/account',
    tags = ['Account']
)
get_db = database.get_db

@router.post('/')
async  def create_account(request: schemas.Account, db: Session = Depends(get_db)):
    return account.create(request, db)

@router.get('/{id}', response_model=schemas.ShowAccount)
async  def get_account(id: int, db: Session = Depends(get_db)):
    return account.show(id, db)

@router.get('/',  response_model=List[schemas.ShowAccount]  )
async  def all(db: Session = Depends(get_db)):
    return account.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowAccount)
async  def update(id: int, request: schemas.ShowAccount, db: Session = Depends(get_db)):
    return account.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async  def destroy(id: int, db: Session = Depends(get_db)):
    return account.destroy(id, db)
