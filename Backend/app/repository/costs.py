from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from app.utils.hashing import Hash
from app.models import models
from app.utils import schemas


def create(request: schemas.CreateCost, db: Session): 
        new_cost = models.OrderCost(
                                    companyId=request.companyId,
                                     totalCost = request.totalCost,
                                     generatedBy = request.generatedBy)
        db.add(new_cost)
        db.commit()
        db.refresh(new_cost)
        return new_cost


def show(id: int, db: Session):
    cost = db.query(models.OrderCost).filter(models.OrderCost.id == id).first()
    if not cost:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Cost with the id {id} is not available")
    return cost

def get_all(db: Session):
    costs = db.query(models.OrderCost).all()
    return costs

def destroy(id: int, db: Session):
    cost = db.query(models.OrderCost).filter(models.OrderCost.id == id).first()
    if not cost:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Cost with id {id} not found")
    db.delete(cost)
    db.commit()
    return cost

def update(id: int, request: schemas.ShowAccount, db: Session):
    cost = db.query(models.OrderCost).filter(models.OrderCost.id == id).first()
    if not cost:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Cost with id {id} not found")
    
    cost.companyId=request.companyId,
    cost.totalCost = request.totalCost,
    cost.generatedBy = request.generatedBy
    db.commit()
    db.refresh(cost)
    return cost