from fastapi import APIRouter, Depends, status
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas,adminOauth2
from repository import admin, company, roles, users, riders, foods, account, orders, feedbacks
from typing import List

router = APIRouter(
    prefix = '/admin',
    tags = ['Admins']
)
get_db = database.get_db

@router.post('/')
async  def create_admin(request: schemas.Admin, db: Session = Depends(get_db)):
    return admin.create(request, db)

@router.get('/{id}', response_model=schemas.ShowAdmin)
async def get_admin(id: int, db: Session = Depends(get_db)):
    return admin.show(id, db)

@router.get('/',  response_model=List[schemas.ShowAdmin]  )
async def all(db: Session = Depends(get_db)):
    return admin.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowAdmin)
async def update(id: int, request: schemas.ShowAdmin, db: Session = Depends(get_db)):
    return admin.update(id, request, db)


#Company
@router.post('/company/')
async def create_company(request: schemas.Company, db: Session = Depends(get_db)):
    return company.create(request, db)

@router.get('/company/{id}', response_model=schemas.ShowCompany)
async def get_company(id: int, db: Session = Depends(get_db)):
    return company.show(id, db)

@router.get('/company/',  response_model=List[schemas.ShowCompany])
async def all(db: Session = Depends(get_db)):
    return company.get_all(db)


@router.put('/company/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowCompany)
async def update(id: int, request: schemas.Company, db: Session = Depends(get_db)):
    return company.update(id, request, db)

#Roles

@router.post('/role/')
async def create_role(request: schemas.Role, db: Session = Depends(get_db)):
    return roles.create(request, db)

@router.get('/role/{id}', response_model=schemas.ShowRole)
async def get_role(id: int, db: Session = Depends(get_db)):
    return roles.show(id, db)

@router.get('/role/',  response_model=List[schemas.ShowRole]  )
async def all(db: Session = Depends(get_db)):
    return roles.get_all(db)


@router.put('/role/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowRole)
async def update(id: int, request: schemas.Role, db: Session = Depends(get_db)):
    return roles.update(id, request, db)

#users

@router.get('/user/{id}', response_model=schemas.ShowUser)
async def get_user(id: int, db: Session = Depends(get_db)):
    return users.show(id, db)

@router.get('/',  response_model=List[schemas.User]  )
async def all(db: Session = Depends(get_db)):
    return users.get_all(db)


@router.put('/user/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowUser)
async def update(id: int, request: schemas.ShowUser, db: Session = Depends(get_db)):
    return users.update(id, request, db)

#Riders
@router.post('/rider/')
async def create_rider(request: schemas.Rider, db: Session = Depends(get_db)):
    return riders.create(request, db)

@router.get('/rider/{id}', response_model=schemas.ShowRider)
async def get_rider(id: int, db: Session = Depends(get_db)):
    return riders.show(id, db)

@router.get('/rider/',  response_model=List[schemas.ShowRider]  )
async def all(db: Session = Depends(get_db)):
    return riders.get_all(db)


@router.put('/rider/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.Rider)
async def update(id: int, request: schemas.Rider, db: Session = Depends(get_db)):
    return riders.update(id, request, db)

#Foods

@router.post('/food/')
async def create_food(request: schemas.Food, db: Session = Depends(get_db)):
    return foods.create(request, db)

@router.get('/food/{id}', response_model=schemas.ShowFood)
async def get_food(id: int, db: Session = Depends(get_db)):
    return foods.show(id, db)

@router.get('/food/',  response_model=List[schemas.ShowFood]  )
async def all(db: Session = Depends(get_db)):
    return foods.get_all(db)


@router.put('/food/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.Food)
async def update(id: int, request: schemas.Food, db: Session = Depends(get_db)):
    return foods.update(id, request, db)

#Accounting

@router.post('/account/')
async  def create_account(request: schemas.Account, db: Session = Depends(get_db)):
    return account.create(request, db)

@router.get('/account/{id}', response_model=schemas.ShowAccount)
async  def get_account(id: int, db: Session = Depends(get_db)):
    return account.show(id, db)

@router.get('/account/',  response_model=List[schemas.ShowAccount]  )
async  def all(db: Session = Depends(get_db)):
    return account.get_all(db)


@router.put('/account/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowAccount)
async  def update(id: int, request: schemas.ShowAccount, db: Session = Depends(get_db)):
    return account.update(id, request, db)


#Orders
@router.get('/order/{id}', response_model=schemas.ShowOrder)
async def get_order(id: int, db: Session = Depends(get_db)):
    return orders.show(id, db)

@router.get('/order/',  response_model=List[schemas.ShowOrder]  )
async def all(db: Session = Depends(get_db)):
    return orders.get_all(db)

@router.put('/order/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowOrder)
async def update(id: int, request: schemas.ShowOrder, db: Session = Depends(get_db)):
    return orders.update(id, request, db)

#Feedbacks

@router.get('/feedback/{id}', response_model=schemas.ShowFeedback)
async def get_feedback(id: int, db: Session = Depends(get_db)):
    return feedbacks.show(id, db)

@router.get('/feedback/',  response_model=List[schemas.ShowFeedback]  )
async def all(db: Session = Depends(get_db)):
    return feedbacks.get_all(db)

@router.get('/feedback/{foodId}', response_model=List[schemas.ShowFeedback])
async def get_feedback_by_food(foodId: int, db: Session = Depends(get_db)):
    return feedbacks.show_by_food(foodId, db)
