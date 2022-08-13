import re
from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from app.utils.hashing import Hash
from app.models import models
from app.utils import schemas
from app.billingCeleryJobs import tasks


def create(request: schemas.CreatePayment, db: Session): 
        new_payment = models.Payment(
                                    companyId=request.companyId,
                                   amountPaid =request.amountPaid,
                                    paymentType =request.paymentType,
                                    paidBy = request.paidBy,
                                    transactionId = request.transactionId,
                                     modifyBy = request.modifyBy)
        db.add(new_payment)
        db.commit()
        db.refresh(new_payment)
        tasks.balance_calc.delay(new_payment.companyId, new_payment.id)
        return new_payment


def show(id: int, db: Session):
    payment = db.query(models.Payment).filter(models.Payment.id == id).first()
   
    if not payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Payment with the id {id} is not available")
    return payment

def get_all(db: Session):
    payments = db.query(models.Payment).all()
    return payments

def destroy(id: int, db: Session):
    payment = db.query(models.Payment).filter(models.Payment.id == id).first()
    if not payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Payment with id {id} not found")
    db.delete(payment)
    db.commit()
    return payment

def update(id: int, request: schemas.ShowPayment, db: Session):
    payment = db.query(models.Payment).filter(models.Payment.id == id).first()
    if not payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Payment with id {id} not found")
    
    payment.companyId=request.companyId,
    payment.amountPaid =request.amountPaid,
    payment.paymentType =request.paymentType,
    payment.paidBy = request.paidBy,
    payment.transactionId = request.transactionId,
    payment.modifyBy = request.modifyBy
    db.commit()
    db.refresh(payment)
    tasks.balance_calc.delay(payment.companyId, payment.id)
    return payment