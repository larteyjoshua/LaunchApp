from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from utils.hashing import Hash
from models import models
from utils import schemas
from fastapi.encoders import jsonable_encoder


def create(request: schemas.Food, db: Session):
    food = db.query(models.Food).filter(models.Food.name == request.name).first()
    if food:
        return{"info": f"Food with the name {request.name} already exist"}
    else: 
        new_food = models.Food(name=request.name, 
                               ingredients=request.ingredients,
                               price = request.price,
                               addedBy = request.addedBy,
                               imagePath = request.imagePath)
        db.add(new_food)
        db.commit()
        db.refresh(new_food)
        return{"success": f"Food with the name {request.name} created"}


def show(id: int, db: Session):
    food = db.query(models.Food).filter(models.Food.id == id).first()
    if not food:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Food with the id {id} is not available")
    return food

def get_all(db: Session):
    foods = db.query(models.Food).all()
    return foods

def destroy(id: int, db: Session):
    food = db.query(models.Food).filter(models.Food.id == id)
    if not food.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Food with id {id} not found")
    food.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id: int, request: schemas.Food, db: Session):
    food = db.query(models.Food).filter(models.Food.id == id).first()
    if not food:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Food with id {id} not found")
    
    food.name = request.name
    food.ingredients = request.ingredients
    food.imagePath = request.imagePath
    food.price = request.price
    db.commit()
    db.refresh(food)
    return food