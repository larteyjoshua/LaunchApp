from fastapi import APIRouter, Depends, status, Security
from models import  models
from sqlalchemy.orm import Session
from utils import database, schemas, oauth2
from repository import admin, company, roles, users, riders, foods, account, orders, feedbacks, user_role
from typing import List
from utils.userRoles import Role

router = APIRouter(
    prefix = '/admin'
    
)
get_db = database.get_db

@router.post('/admin/register', tags = ['Admins', 'Super Admin'])
async  def create_admin(request: schemas.Admin, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"]],
    )):
    return admin.create(request, db)

@router.get('/{id}', response_model=schemas.ShowAdmin, tags = ['Admins', 'Cook', 'Super Admin'])
async def get_admin(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"], Role.COOK["name"]],
    )):
    return admin.show(id, db)

@router.get('/admin/',  response_model=List[schemas.ShowAdmin], tags = ['Admins', 'Super Admin'])
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return admin.get_all(db)


@router.put('/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowAdmin, tags = ['Admins', 'Cook', 'Super Admin', 'Order Manager', 'Accountant'])
async def update(id: int, request: schemas.ShowAdmin, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.COOK["name"], Role.ORDER_MANAGER["name"],  Role.ACCOUNT_MANAGER["name"]],
    )):
    return admin.update(id, request, db)


#Company
@router.post('/company/', tags = ['Admins', 'Super Admin'])
async def create_company(request: schemas.Company, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    print(request)
    return company.create(request, db)

@router.get('/company/{id}', response_model=schemas.ShowCompany, tags = ['Admins', 'Super Admin'])
async def get_company(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return company.show(id, db)

@router.get('/company/',  response_model=List[schemas.ShowCompany], tags = ['Admins', 'Super Admin'])
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return company.get_all(db)


@router.put('/company/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowCompany, tags = ['Admins', 'Super Admin'])
async def update(id: int, request: schemas.Company, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return company.update(id, request, db)

#Roles

@router.post('/role/', tags = ['Admins', 'Super Admin'])
async def create_role(request: schemas.Role, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return roles.create(request, db)

@router.get('/role/{id}', response_model=schemas.ShowRole, tags = ['Admins', 'Super Admin'])
async def get_role(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"]],
    )):
    return roles.show(id, db)

@router.get('/role/',  response_model=List[schemas.ShowRole], tags = ['Admins', 'Super Admin'] )
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return roles.get_all(db)


@router.put('/role/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowRole, tags = ['Admins', 'Super Admin'])
async def update(id: int, request: schemas.Role, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return roles.update(id, request, db)

#Assigning User Roles.

@router.post('/userRole/', tags = ['Admins', 'Super Admin'])
async def assigin_userRole(request: schemas.UserRoleBase, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return user_role.create(request, db)

@router.get('/userRole/{id}', tags = ['Admins', 'Super Admin'])
async def get_userRole(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"]],
    )):
    return user_role.show(id, db)

@router.get('/userRoles/', tags = ['Admins', 'Super Admin'] )
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return user_role.get_all(db)


@router.put('/userRole/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.UserRoleBase, tags = ['Admins', 'Super Admin'])
async def update(id: int, request: schemas.Role, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return user_role.update(id, request, db)

#users

@router.get('/user/{id}', response_model=schemas.ShowUser, tags = ['Admins', 'Super Admin'])
async def get_user(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return users.show(id, db)

@router.get('/users/all',  response_model=List[schemas.User], tags = ['Admins', 'Super Admin'])
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return users.get_all(db)


@router.put('/user/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowUser, tags = ['Admins', 'Super Admin'])
async def update(id: int, request: schemas.ShowUser, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return users.update(id, request, db)

#Riders
@router.post('/rider/', tags = ['Admins', 'Order Manager',  'Super Admin'])
async def create_rider(request: schemas.Rider, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return riders.create(request, db)

@router.get('/rider/{id}', response_model=schemas.ShowRider, tags = ['Admins', 'Order Manager', 'Super Admin'])
async def get_rider(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return riders.show(id, db)

@router.get('/rider/',  response_model=List[schemas.ShowRider], tags = ['Admins', 'Order Manager', 'Super Admin']  )
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return riders.get_all(db)


@router.put('/rider/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.Rider, tags = ['Admins', 'Order Manager', 'Super Admin'])
async def update(id: int, request: schemas.Rider, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return riders.update(id, request, db)

#Foods

@router.post('/food/', tags = ['Admins', 'Super Admin' ])
async def create_food(request: schemas.Food, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"]],
    )):
    return foods.create(request, db)

@router.get('/food/{id}', response_model=schemas.ShowFood,  tags = ['Admins', 'Cook', 'Super Admin' ])
async def get_food(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"],  Role.ADMIN["name"], Role.COOK["name"]],
    )):
    return foods.show(id, db)

@router.get('/food/',  response_model=List[schemas.ShowFood],  tags = ['Admins', 'Cook', 'Super Admin' ]  )
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.COOK["name"]],
    )):
    return foods.get_all(db)


@router.put('/food/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.Food,  tags = ['Admins', 'Super Admin' ])
async def update(id: int, request: schemas.Food, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"]],
    )):
    return foods.update(id, request, db)

#Accounting

@router.post('/account/',  tags = ['Admins', 'Accountant', 'Super Admin' ])
async  def create_account(request: schemas.Account, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.ACCOUNT_MANAGER["name"]],
    )):
    return account.create(request, db)

@router.get('/account/{id}', response_model=schemas.ShowAccount,  tags = ['Admins', 'Accountant', 'Super Admin' ])
async  def get_account(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.ACCOUNT_MANAGER["name"]],
    )):
    return account.show(id, db)

@router.get('/account/',  response_model=List[schemas.ShowAccount],  tags = ['Admins','Accountant', 'Super Admin' ]  )
async  def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.ACCOUNT_MANAGER["name"]],
    )):
    return account.get_all(db)


@router.put('/account/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowAccount,  tags = ['Admins', 'Accountant', 'Super Admin' ])
async  def update(id: int, request: schemas.ShowAccount, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.ACCOUNT_MANAGER["name"]],
    )):
    return account.update(id, request, db)


#Orders
@router.get('/order/{id}', response_model=schemas.ShowOrder,  tags = ['Admins','Accountant', 'Super Admin', 'Cook'])
async def get_order(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.COOK["name"], Role.ORDER_MANAGER["name"],  Role.ACCOUNT_MANAGER["name"]],
    )):
    return orders.show(id, db)

@router.get('/order/',  response_model=List[schemas.ShowOrder],  tags = ['Admins', 'Accountant', 'Super Admin', 'Cook'])
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.COOK["name"], Role.ORDER_MANAGER["name"],  Role.ACCOUNT_MANAGER["name"]],
    )):
    return orders.get_all(db)

@router.put('/order/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.ShowOrder,  tags = ['Admins', 'Accountant', 'Super Admin', 'Cook'])
async def update(id: int, request: schemas.ShowOrder, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.COOK["name"], Role.ORDER_MANAGER["name"],  Role.ACCOUNT_MANAGER["name"]],
    )):
    return orders.update(id, request, db)

#Feedbacks

@router.get('/feedback/{id}', response_model=schemas.ShowFeedback,  tags = ['Admins', 'Order Manager', 'Super Admin' ])
async def get_feedback(id: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"]],
    )):
    return feedbacks.show(id, db)

@router.get('/feedback/',  response_model=List[schemas.ShowFeedback], tags = ['Admins', 'Order Manager', 'Super Admin' ] )
async def all(db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"]],
    )):
    return feedbacks.get_all(db)

@router.get('/feedback/{foodId}', response_model=List[schemas.ShowFeedback], tags = ['Admins', 'Order Manager', 'Super Admin', 'Cook'])
async def get_feedback_by_food(foodId: int, db: Session = Depends(get_db), current_user: schemas.User = Security(
        oauth2.get_current_active_user,
        scopes=[Role.SUPER_ADMIN["name"], Role.ADMIN["name"], Role.COOK["name"]],
    )):
    return feedbacks.show_by_food(foodId, db)
