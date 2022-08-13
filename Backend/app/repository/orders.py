from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from app.models import models
from app.utils import schemas
from app.utils.s3BucketHelpers import create_presigned_url
from app.utils.config import settings
from sqlalchemy import desc
from typing import List


def create(requests: List[schemas.Order], db: Session, current_user): 
        print(requests)
        data =[]
        print(len(requests) == 0)
        if current_user.companyId is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail = f"Contact Admin to Assign you to a Company")

        if len(requests) == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail = f"Cart is Empty")
        else: 
            for request in requests:
                company = db.query(models.Company).filter(models.Company.id == current_user.companyId).first() 
                food = db.query(models.Food).filter(models.Food.id == request.foodId).first()
                new_order = models.Order(foodId=request.foodId, 
                                    totalNumber = request.totalNumber,
                                    companyId= current_user.companyId,
                                    cost = (request.totalNumber * food.price),
                                    userId = current_user.id,
                                    destination = company.location,
                                    trackingStage = 'pending confirmation')
                print(new_order)
                        
                db.add(new_order)
                db.commit()
                db.refresh(new_order)
                data.append(new_order)

            return data


def show(id: int, db: Session):
    order = db.query(models.Order).filter(models.Order.id == id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Order with the id {id} is not available")
    return order

def get_all(db: Session):
    orders = db.query(models.Order).all()
    return orders

def destroy(id: int, db: Session):
    order = db.query(models.Order).filter(models.Order.id == id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Order with id {id} not found")
    db.delete(order)
    db.commit()
    return order


def update(id: int, request: schemas.ShowOrder, db: Session):
    order = db.query(models.Order).filter(models.Order.id == id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
        
    food = db.query(models.Food).filter(models.Food.id == request.foodId).first()
    user = db.query(models.User).filter(models.User.id == request.userId == id).first()
    order.foodId=request.foodId 
    order.totalNumber = request.totalNumber
    order.companyId= user.companyId
    order.cost = (request.totalNumber * food.price)
    order.userId = request.userId
    order.riderId = request.riderId
    order.trackingStage = request.trackingStage
    db.commit()
    db.refresh(order)
    return order

def get_all_by_user(db: Session, current_user):
    #orders = db.query(models.Order).filter(models.Order.userId == current_user.id).all()

    orders = db.query(models.Order, models.Food, models.Rider).filter(
         models.Order.foodId == models.Food.id).outerjoin(
         models.Rider).filter(
        models.Order.userId == current_user.id).order_by(models.Order.orderDate.desc()).all()
    
    seen_id = set()
    new_list = []
    for obj in orders:
        if obj.Order.foodId not in seen_id:
            new_list.append(obj)
            seen_id.add(obj.Order.foodId)

    for order in new_list:
        fileName = order.Food.imagePath
        order.Food.imagePath= create_presigned_url(settings.BUCKET_NAME, fileName)

    for foodOrder in orders:
        for newList in new_list:
            if foodOrder.Order.foodId == newList.Order.foodId:
                foodOrder.Food.imagePath = newList.Food.imagePath
    return orders