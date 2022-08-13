from fastapi import APIRouter, Depends, status, Security
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas, oauth2
from app.repository import users, orders, foods
from typing import List
from app.utils.userRoles import Role
from app.repository import feedbacks
from app.utils import initialsdb


router = APIRouter(
    prefix = '/user',
    tags = ['Users']
)
get_db = database.get_db

@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowUser)
async def update(id: int, request: schemas.ShowUser, db: Session = Depends(get_db), 
                 current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"],],
    )):
    return users.update(id, request, db)

@router.post('/feedback/create')
async  def create_feedback(request: schemas.Feedback, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
       scopes=[Role.USER["name"],],
    )):
    return feedbacks.create(request, db, current_user)

@router.get('/details', response_model= schemas.ShowUserDetails)
async def get_user( db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return users.showDetails(current_user.id, db)


@router.post('/order/create')
async def create_order(requests: List[schemas.Order], db: Session = Depends(get_db),  
                       current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return orders.create(requests, db, current_user)

@router.get('/order/{id}', response_model=schemas.ShowOrder)
async def get_user(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return orders.show(id, db)

@router.get('/order/', response_model=List[schemas.ShowUserOrder])
async def all_by_user(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return orders.get_all_by_user(db, current_user)

@router.put('/order/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowOrder, )
async def update(id: int, request: schemas.ShowOrder, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return orders.update(id, request, db)


@router.get('/food/',  response_model=List[schemas.ShowFood])
async def all(db: Session = Depends(get_db)):
    return foods.get_all(db)

# @router.get('/ini_db')
# async def db_init(db: Session = Depends(get_db)):
#     return initialsdb.databaseinit(db)