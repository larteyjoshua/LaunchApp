from fastapi import APIRouter, Depends, status, Security
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas, oauth2
from app.repository import users, orders
from typing import List
from app.utils.userRoles import Role
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

@router.get('/detials', response_model=schemas.ShowUser)
async def get_user( db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return users.show(current_user.id, db)


@router.post('/order')
async def create_order(request: schemas.Order, db: Session = Depends(get_db),  
                       current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return orders.create(request, db, current_user)

@router.get('/order/{id}', response_model=schemas.ShowOrder)
async def get_user(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return orders.show(id, db)

@router.get('/orders/all', response_model=List[schemas.ShowOrder])
async def all_by_user(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"],  Role.ADMIN["name"]],
    )):
    return orders.get_all_by_user(db, current_user)

@router.put('/order/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowOrder, )
async def update(id: int, request: schemas.ShowOrder, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.USER["name"]],
    )):
    return orders.update(id, request, db)

# @router.get('/ini_db')
# async def db_init(db: Session = Depends(get_db)):
#     return initialsdb.databaseinit(db)