from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from utils.hashing import Hash
from models import models
from utils import schemas
from fastapi.encoders import jsonable_encoder


def create(request: schemas.Admin, db: Session):
    user = db.query(models.Manager).filter(models.Manager.email == request.email).first()
    if user:
        return{"info": f"Admin with the email {request.email} already exist"}
    else: 
        new_manager = models.Manager(fullName=request.fullName, email=request.email, password=Hash.bcrypt(request.password))
        db.add(new_manager)
        db.commit()
        db.refresh(new_manager)
        return{"success": f"Manager with the email {request.email} created"}


def show(id: int, db: Session):
    admin = db.query(models.Manager).filter(models.Manager.id == id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return admin

def get_all(db: Session):
    admins = db.query(models.Manager).all()
    return admins

def destroy(id: int, db: Session):
    admin = db.query(models.Manager).filter(models.Manager.id == id)
    if not admin.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Admin with id {id} not found")
    admin.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id: int, request: schemas.ShowUser, db: Session):
    admin = db.query(models.Manager).filter(models.Manager.id == id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    
    admin.password = Hash.bcrypt(request.password) 
    admin.email = request.email
    admin.fullName = request.fullName
    admin.isActive = request.isActive
    admin.isSuper = request.isSuper
    admin.roleId = request.roleId
    db.commit()
    db.refresh(admin)
    return admin