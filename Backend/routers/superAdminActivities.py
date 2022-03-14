from fastapi import APIRouter, Depends, status, Security
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas, oauth2
from repository import admin, company, roles, users, riders, foods, account, orders, feedbacks,user_role
from typing import List
from utils.userRoles import Role


router = APIRouter(
    prefix = '/admin',
    tags = ['Super Admin']
)
get_db = database.get_db

@router.delete('/admin/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db),  current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return admin.destroy(id, db)

@router.delete('/role/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return roles.destroy(id, db)

@router.delete('/userRole/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return user_role.destroy(id, db)

@router.delete('/company/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return company.destroy(id, db)

@router.delete('/user/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return users.destroy(id, db)

@router.delete('/rider/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return riders.destroy(id, db)

@router.delete('/food/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return foods.destroy(id, db)

@router.delete('/account/{id}', status_code=status.HTTP_204_NO_CONTENT)
async  def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return account.destroy(id, db)

@router.delete('/order/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return orders.destroy(id, db)

@router.delete('/feedback/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return feedbacks.destroy(id, db)

@router.delete('/order/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"]],
    )):
    return orders.destroy(id, db)