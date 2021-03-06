from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from app.models import models
from app.utils import schemas


def create(request: schemas.Role, db: Session):
    role = db.query(models.Role).filter(models.Role.name == request.name).first()
    if role:
        raise HTTPException(status_code= 303,
                            detail =f"Role with the email { request.name} already exist")
    else: 
        new_role = models.Role(name=request.name, description = request.description)
        db.add(new_role)
        db.commit()
        db.refresh(new_role)
        return new_role


def show(id: int, db: Session):
    role = db.query(models.Role).filter(models.Role.id == id).first()
    if not role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Role with the id {id} is not available")
    return role

def get_all(db: Session):
    roles = db.query(models.Role).all()
    return roles

def destroy(id: int, db: Session):
    role = db.query(models.Role).filter(models.Role.id == id).first()
    if not role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    db.delete(role)
    db.commit()
    return role


def update(id: int, request: schemas.ShowUser, db: Session):
    role = db.query(models.Role).filter(models.Role.id == id).first()
    if not role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Role with id {id} not found")
     
    role.name = request.name
    role.description = request.description
    db.commit()
    db.refresh(role)
    return role

def role_by_name(name: str, db: Session):
    role = db.query(models.Role).filter(models.Role.name == name).first()
    if not role:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Role with the id {name} is not available")
    return role