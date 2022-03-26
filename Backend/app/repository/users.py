from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.utils.hashing import Hash
from app.models import models
from app.utils import schemas
from app.emails.newUser import addNewUser
from app.emails.addBulkUser import addBulkUser
from app.utils.passwordRecoveryHelper import generate_password_recovery_token, verify_password_reset_token
from app.emails import passwordRecoveryEmail
import random
import string


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
        respo = addNewUser(request.email, request.fullName)
        print(respo)
        return{"success": f"User with the email {request.email} created"}


def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user

def get_all(db: Session):
    users = db.query(models.User).filter(models.User.companyId != None).all()
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


def passwordRecover( email: str, db: Session, url:str):

    user = db.query(models.User).filter(models.User.email == email).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this email does not exist in the system.",
        )
    token = generate_password_recovery_token(email=user.email)

    link = f"{url}?token={token}"
    passwordRecoveryEmail.passwordRevovery(user.email, user.fullName, link)
    return {"msg": "Password recovery email sent"}

def passwordReset(token: str, new_password: str, db: Session):
    email = verify_password_reset_token(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    elif not is_active(user):
        raise HTTPException(status_code=400, detail="Inactive user")
    

    user.paaword = Hash.bcrypt(new_password)
    db.add(user)
    db.commit()
    return {"msg": "Password updated successfully"}

def createBulk(request: schemas.BulkUser, companyName:str, db: Session):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    company = db.query(models.Company).filter(models.Company.name == companyName).first()
    if user:
        return{"info": f"User with the email {request.email} already exist"}
    elif not company:
         return{"info": f"Company with the Name: {companyName} does not exist"}
    else: 
        lower = string.ascii_lowercase
        upper = string.ascii_uppercase
        num = string.digits
        symbols = string.punctuation
        all = lower + upper + num + symbols
        temp = random.sample(all,12)
        generatePassword = "".join(temp)
        print(generatePassword)

        new_user = models.User(fullName=request.fullName, email=request.email, password=Hash.bcrypt(generatePassword), companyId =company.id)
        print(new_user)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        respo = addBulkUser(request.email, request.fullName,generatePassword)
        print(respo)
       