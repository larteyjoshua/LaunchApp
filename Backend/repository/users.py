from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from utils.hashing import Hash
from models import models
from utils import schemas



def create(request: schemas.User, db: Session):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    company = db.query(models.Company).filter(models.Company.id ==request.companyId).first()
    if user:
        return{"info": f"User with the email {request.email} already exist"}
    elif not company:
         return{"info": f"Company with the id {request.companyId} does not exist"}
    else: 
        new_user = models.User(fullName=request.fullName, email=request.email, password=Hash.bcrypt(request.password), companyId =request.companyId)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return{"success": f"User with the email {request.email} created"}


def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user

def get_all(db: Session):
    users = db.query(models.User).all()
    return users

def destroy(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id)
    if not user.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    user.delete(synchronize_session=False)
    db.commit()
    return 'done'

def update(id: int, request: schemas.ShowUser, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} not found")
    
    user.password = Hash.bcrypt(request.password) 
    user.email = request.email
    user.fullName = request.fullName
    user.companyId = request.companyId
    user.isActive = request.isActive
    db.commit()
    db.refresh(user)
    return user

def is_active(user: schemas.ShowUser) -> bool:
        return user.isActive

def is_superuser(user: schemas.ShowUser) -> bool:
        return user.is_superuser
    
def get_by_email(db: Session, request):
    user = db.query(models.User).filter(models.User.email ==request).first()
    return user

def authenticate( db: Session ,request):
        user = get_by_email(db, request.username)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
        elif not Hash.verify(user.password, request.password):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect password")
        return user

def showUser(db: Session, email: str ):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {email} is not available")
    return user

def get_by_name(fullName: str, db: Session):
    user = db.query(models.User).filter(
        models.User.fullName ==fullName).first()
    return user