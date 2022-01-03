from typing import List, Optional
from pydantic import BaseModel
from datetime import  datetime

class User(BaseModel):
    fullName:str
    email:str
    password: str
    companyId: Optional[int] = None

    class Config():
        orm_mode = True

class ShowUser(BaseModel):
    id: int
    fullName:str
    email:str
    password: str
    companyId: Optional[int] = None
    isActive: bool
    
    class Config():
        orm_mode = True


class ShowAdmin(BaseModel):
    id: int
    fullName:str
    email:str
    password: str
    roleId: Optional[int] = None
    isActive: bool
    
    class Config():
        orm_mode = True
           
class Admin(BaseModel):
    fullName:str
    email:str
    password: str

    class Config():
        orm_mode = True        

class Role(BaseModel):
    name: str
    description: str
    class Config():
        orm_mode = True 
        
class ShowRole(BaseModel):
    id: int
    name: str
    dateAdded: datetime
    
    class Config():
        orm_mode = True
        
class Company(BaseModel):
    name:str
    email:str
    phoneNumber: str = None
    location: str
    addedBy: int

    class Config():
        orm_mode = True
        
class ShowCompany(BaseModel):
    name:str
    email:str
    phoneNumber: str = None
    isActive: Optional[bool] = None
    location: str
    dateAdded: datetime
    addedBy: int

    class Config():
        orm_mode = True

class Rider(BaseModel):
    name:str
    email:str
    tellNumber: str = None
    motorNumber: str
    addedBy: int

    class Config():
        orm_mode = True

class ShowRider(BaseModel):
    name:str
    email:str
    tellNumber: str = None
    motorNumber: str
    dateAdded: datetime
    addedBy: int = None

    class Config():
        orm_mode = True
    
class Food(BaseModel):
    name:str
    ingredients:str
    imagePath: str = None
    price: float
    addedBy: int = None

    class Config():
        orm_mode = True

class ShowFood(BaseModel):
    name:str
    ingredients:str
    imagePath: str = None
    price: float
    dateAdded: datetime
    addedBy: int = None

    class Config():
        orm_mode = True
    
class Order(BaseModel):
    foodId:int
    totalNumber:int
    
    class Config():
        orm_mode = True
        
class ShowOrder(BaseModel):
    id: int
    foodId:int
    totalNumber:int
    userId: int
    destination: str
    orderDate: datetime
    trackingStage: str
    riderId: int = None
    cost: float
    trackingStage: str
    
    class Config():
        orm_mode = True
        
class Feedback(BaseModel):
    foodId: int
    comment: str
    stars: int
    commentedBy: str
    
    class Config():
        orm_mode = True
        
class ShowFeedback(BaseModel):
    foodId: int
    comment: str
    stars: int
    commentedBy: str
    dateCommented: datetime = None
    
    class Config():
        orm_mode = True
        
class Account(BaseModel):
    companyId: int
    totalCost: float
    amountPaid: float = None
    balance: float = None
    modifyBy: int
    class Config():
        orm_mode = True

class ShowAccount(BaseModel):
    companyId: int
    totalCost: float
    amountPaid: float = None
    balance: float = None
    modifyBy: int
    dateModified: datetime = None
    class Config():
        orm_mode = True
        
class Login(BaseModel):
    username: str
    password:str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    
class UserRoleBase(BaseModel):
    user_id: Optional[int] = None
    role_id: Optional[int] = None