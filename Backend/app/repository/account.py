from sqlalchemy.orm import Session
from fastapi import HTTPException, status, BackgroundTasks
from app.utils.hashing import Hash
from app.models import models
from app.utils import schemas


def create(request: schemas.Account, db: Session): 
        new_account = models.Account(companyId=request.companyId,
                                     totalCost = request.totalCost,
                                     amountPaid = request.amountPaid,
                                     balance = (int(request.totalCost) - int(request.amountPaid)),
                                     modifyBy = request.modifyBy)
        db.add(new_account)
        db.commit()
        db.refresh(new_account)
        return new_account


def show(id: int, db: Session):
    account = db.query(models.Account).filter(models.Account.id == id).first()
    if not account:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Account with the id {id} is not available")
    return account

def get_all(db: Session):
    accounts = db.query(models.Account).all()
    return accounts

def destroy(id: int, db: Session):
    account = db.query(models.Account).filter(models.Account.id == id).first()
    if not account:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Account with id {id} not found")
    db.delete(account)
    db.commit()
    return account

def update(id: int, request: schemas.ShowAccount, db: Session):
    account = db.query(models.Account).filter(models.Account.id == id).first()
    if not account:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Account with id {id} not found")
    
    account.amountPaid = request.amountPaid,
    account.balance = (int(account.totalCost) - int(request.amountPaid)),
    account.modifyBy = request.modifyBy
    db.commit()
    db.refresh(account)
    return account