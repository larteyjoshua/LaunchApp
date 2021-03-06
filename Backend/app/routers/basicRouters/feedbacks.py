from fastapi import APIRouter, Depends, status
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas
from app.repository import feedbacks
from typing import List

router = APIRouter(
    prefix = '/feedback',
    tags = ['Feedback']
)
get_db = database.get_db

@router.post('/')
async def create_feedback(request: schemas.Feedback, db: Session = Depends(get_db)):
    return feedbacks.create(request, db)

@router.get('/{id}', response_model=schemas.ShowFeedback)
async def get_feedback(id: int, db: Session = Depends(get_db)):
    return feedbacks.show(id, db)

@router.get('/',  response_model=List[schemas.ShowFeedback]  )
async def all(db: Session = Depends(get_db)):
    return feedbacks.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowFeedback)
async def update(id: int, request: schemas.ShowFeedback, db: Session = Depends(get_db)):
    return feedbacks.update(id, request, db)

@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db)):
    return feedbacks.destroy(id, db)
