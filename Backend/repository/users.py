from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from utils.hashing import Hash
from models import models
from utils import schemas
from fastapi.encoders import jsonable_encoder


def create(request: schemas.User, db: Session):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if user:
        return{"info": f"User with the email {request.email} is already exist"}
    else: 
        new_user = models.User(fullName=request.fullName, email=request.email, password=Hash.bcrypt(request.password))
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return{"success": f"User with the email {request.email} created"}


def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user

def get_all(db: Session):
    users = db.query(models.User).all()
    return users

def destroy(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    user.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id: int, request: schemas.ShowUser, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    
    user.password = Hash.bcrypt(request.password) 
    user.email = request.email
    user.fullName = request.fullName
    user.companyId = request.companyId
    user.is_active = request.is_active
    # updated_user = user
    
    # print(updated_user.password)
  #  db.add(updated_user)
    # db.query(models.User).filter(models.User.id == id).update(dict(updated_user))
    #user.update(request.dict(exclude_unset= True))
    # db.refresh(user)
    db.commit()
    db.refresh(user)
    return user