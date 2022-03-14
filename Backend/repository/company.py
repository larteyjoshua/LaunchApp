from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from utils.hashing import Hash
from models import models
from utils import schemas
from fastapi.encoders import jsonable_encoder


def create(request: schemas.Company, db: Session):
    company = db.query(models.Company).filter(models.Company.email == request.email).first()
    if company:
        return{"info": f"Company with the email {request.email} already exist"}
    else: 
        new_company = models.Company(name=request.name,
                                     email=request.email,
                                    phoneNumber = request.phoneNumber,
                                     location=request.location,
                                     addedBy = request.addedBy 
                                    )
        db.add(new_company)
        db.commit()
        db.refresh(new_company)
        return{"success": f"Company with the email {request.email} created"}


def show(id: int, db: Session):
    company = db.query(models.Company).filter(models.Company.id == id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Company with the id {id} is not available")
    return company

def get_all(db: Session):
    companies = db.query(models.Company).all()
    return companies

def destroy(id: int, db: Session):
    Company = db.query(models.Company).filter(models.Company.id == id)
    if not Company.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Company with id {id} not found")
    Company.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id: int, request: schemas.Company, db: Session):
    company = db.query(models.Company).filter(models.Company.id == id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Company with id {id} not found")

    company.email = request.email
    company.name = request.name
    company.location = request.location
    company.phoneNumber = request.phoneNumber
    company.isActive = request.isActive
    db.commit()
    db.refresh(company)
    return company