from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from utils.hashing import Hash
from models import models
from utils import schemas
from fastapi.encoders import jsonable_encoder
from utils.s3BucketHelpers import delete_file_from_s3, create_presigned_url
from utils.config import settings


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
    print(food.imagePath)
    delete_file_from_s3(settings.BUCKET_NAME,food.imagePath)
    db.delete(food)
    #food.delete(synchronize_session=False)
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