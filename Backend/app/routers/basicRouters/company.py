from fastapi import APIRouter, Depends, status
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas
from app.repository import company
from typing import List

router = APIRouter(
    prefix = '/company',
    tags = ['Company']
)
get_db = database.get_db

@router.post('/')
async def create_company(request: schemas.Company, db: Session = Depends(get_db)):
    return company.create(request, db)

@router.get('/{id}', response_model=schemas.ShowCompany)
async def get_company(id: int, db: Session = Depends(get_db)):
    return company.show(id, db)

@router.get('/',  response_model=List[schemas.ShowCompany])
async def all(db: Session = Depends(get_db)):
    return company.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowCompany)
async def update(id: int, request: schemas.Company, db: Session = Depends(get_db)):
    return company.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return company.destroy(id, db)
