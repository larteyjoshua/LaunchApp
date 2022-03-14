from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from utils.hashing import Hash
from models import models
from utils import schemas
from fastapi.encoders import jsonable_encoder


def create(request: schemas.Rider, db: Session):
    rider = db.query(models.Rider).filter(models.Rider.email == request.email).first()
    if rider:
        return{"info": f"Rider with the name {request.rider} already exist"}
    else: 
        new_rider = models.Rider(name=request.name,
                                 email =request.email, 
                                 tellNumber = request.tellNumber, 
                                 motorNumber =request.motorNumber,
                                 addedBy = request.addedBy)
        db.add(new_rider)
        db.commit()
        db.refresh(new_rider)
        return{"success": f"Rider with the name {request.name} created"}


def show(id: int, db: Session):
    rider = db.query(models.Rider).filter(models.Rider.id == id).first()
    if not rider:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Rider with the id {id} is not available")
    return rider

def get_all(db: Session):
    riders = db.query(models.Rider).all()
    return riders

def destroy(id: int, db: Session):
    rider = db.query(models.Rider).filter(models.Rider.id == id)
    if not rider.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Rider with id {id} not found")
    rider.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id: int, request: schemas.Rider, db: Session):
    rider = db.query(models.Rider).filter(models.Rider.id == id).first()
    if not rider:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Rider with id {id} not found")
     
    rider.name = request.name
    rider.emal = request.email
    rider.tellNumber = request.tellNumber
    rider.motorNumber = request.motorNumber
    rider.addedBy = request.addedBy
    db.commit()
    db.refresh(rider)
    return rider