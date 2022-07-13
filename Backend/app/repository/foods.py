from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from app.models import models
from app.utils import schemas
from fastapi.encoders import jsonable_encoder
from app.utils.s3BucketHelpers import delete_file_from_s3, create_presigned_url
from app.utils.config import settings


def create(request: schemas.Food, db: Session):
    food = db.query(models.Food).filter(models.Food.name == request.name).first()
    if food:
           raise HTTPException(status_code= 303,
                            detail =f"Food with the email { request.name} already exist")
    else: 
        new_food = models.Food(name=request.name, 
                               ingredients=request.ingredients,
                               price = request.price,
                               addedBy = request.addedBy,
                               imagePath = request.imagePath)
        db.add(new_food)
        db.commit()
        db.refresh(new_food)
        new_food.imagePath= create_presigned_url(settings.BUCKET_NAME, new_food.imagePath)
        return new_food


def show(id: int, db: Session):
    food = db.query(models.Food).filter(models.Food.id == id).first()
    if not food:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Food with the id {id} is not available")
     
    food.imagePath = create_presigned_url(settings.BUCKET_NAME, food.imagePath)
    return food

def get_all(db: Session):
    foods = db.query(models.Food).all()
    url_list = []
    for food in foods:
        food.imagePath= create_presigned_url(settings.BUCKET_NAME, food.imagePath)
    return foods

def destroy(id: int, db: Session):
    food = db.query(models.Food).filter(models.Food.id == id).first()
    if not food:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Food with id {id} not found")
    delete_file_from_s3(settings.BUCKET_NAME,food.imagePath)
    db.delete(food)
    db.commit()
    return food


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