from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.utils.hashing import Hash
from app.models import models
from app.utils import schemas
from fastapi.encoders import jsonable_encoder


def create(request: schemas.Feedback, db: Session, current_user):
        new_feedback = models.Feedback(foodId=request.foodId, 
                               comment=request.comment,
                               stars = request.stars,
                               commentedBy = current_user.id)
        db.add(new_feedback)
        db.commit()
        db.refresh(new_feedback)
        return new_feedback


def show(id: int, db: Session):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == id).first()
    if not feedback:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Feedback with the id {id} is not available")
    return feedback

def get_all(db: Session):
    foodbacks = db.query(models.Feedback).all()
    return foodbacks

def destroy(id: int, db: Session):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == id)
    if not feedback.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"feedback with id {id} not found")
    db.delete(feedback)
    db.commit()
    return feedback

def update(id: int, request: schemas.ShowFeedback, db: Session):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == id).first()
    if not feedback:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Feedback with id {id} not found")
    
    feedback.foodId = request.foodId
    feedback.comment = request.comment
    feedback.stars = request.stars
    db.commit()
    db.refresh(feedback)
    return feedback


def show_by_food(id: int, db: Session):
    feedbacks = db.query(models.Feedback).filter(models.Feedback.foodId == id).All()
    if  feedbacks is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Feedbacks not available for for dood with id {id}")
    return feedbacks