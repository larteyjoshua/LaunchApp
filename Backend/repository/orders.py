from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from models import models
from utils import schemas


def create(request: schemas.Food, db: Session, current_user): 
        food = db.query(models.Food).filter(models.Food.id == request.foodId).first()
        if current_user.companyId is None:
           return{"info": f"Update your profile with Company"}
        else: 
            company = db.query(models.Company).filter(models.Company.id == current_user.companyId).first() 
            new_order = models.Order(foodId=request.foodId, 
                                totalNumber = request.totalNumber,
                                companyId= current_user.companyId,
                                cost = (request.totalNumber * food.price),
                                userId = current_user.id,
                                destination = company.location,
                                trackingStage = 'pending confirmation'
                            )
            db.add(new_order)
            db.commit()
            db.refresh(new_order)
            return{"success": f"Order with the Food name {food.name} Booked"}


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
    order = db.query(models.Order).filter(models.Order.id == id)
    if not order.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Order with id {id} not found")
    order.delete(synchronize_session=False)
    db.commit()
    return 'done'

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
    orders = db.query(models.Order).filter(models.Order.userId == current_user.id).all()
    return orders