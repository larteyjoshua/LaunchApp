from cmath import cos
from fastapi import APIRouter, Depends, status, Security
from app.models import  models
from sqlalchemy.orm import Session
from app.utils import database, schemas, oauth2
from app.repository import admin, company, roles, users, riders, foods, orders, feedbacks,user_role, costs, payments
from typing import List
from app.utils.userRoles import Role


router = APIRouter(
    prefix = '/admin',
    tags = ['Super Admin']
)
get_db = database.get_db

@router.delete('/admin/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db),  current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return admin.destroy(id, db)

@router.delete('/role/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return roles.destroy(id, db)

@router.delete('/userRole/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return user_role.destroy(id, db)

@router.delete('/company/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return company.destroy(id, db)

@router.delete('/user/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return users.destroy(id, db)

@router.delete('/rider/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return riders.destroy(id, db)

@router.delete('/food/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return foods.destroy(id, db)

# @router.delete('/account/delete/{id}')
# async  def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
#         oauth2.get_current_active_user,
#         scopes=[Role.SUPER_ADMIN["name"]],
#     )):
#     return account.destroy(id, db)

@router.delete('/order/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return orders.destroy(id, db)

@router.delete('/feedback/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return feedbacks.destroy(id, db)

@router.delete('/order/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return orders.destroy(id, db)

@router.delete('/payment/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return payments.destroy(id, db)

@router.delete('/cost/delete/{id}')
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return costs.destroy(id, db)