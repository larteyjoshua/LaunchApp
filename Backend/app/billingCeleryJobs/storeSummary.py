from operator import truediv
from sqlalchemy.orm import Session
from app import models


def dashMiniCardData( db: Session):
    companies = db.query(models.Company).all()
    users = db.query(models.User).filter(models.User.companyId != None).all()
    orders = db.query(models.Order).all()


def percentIncrease(PreviousTotalUsers:int, totalUsers: int):
    percent_increase = (((totalUsers-PreviousTotalUsers)/totalUsers)* 100)
    return percent_increase

def changeBolean(PreviousTotalUsers:int, totalUsers: int):
    if totalUsers > PreviousTotalUsers:
        return True
    else: 
        return False