from cgitb import text
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
    dateCreated: datetime
    password: str
    companyId: Optional[int] = None
    isActive: bool
    
    class Config():
        orm_mode = True
class ShowAdmin(BaseModel):
    id: int = None
    fullName:str = None
    email:str = None
    password: str = None
    isActive: bool =None
    
  
    
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
    description: str
    dateAdded: datetime
    
    class Config():
        orm_mode = True
        
class Company(BaseModel):
    name:str
    email:str
    phoneNumber: str = None
    location: str
   
    class Config():
        orm_mode = True
        
class ShowCompany(BaseModel):
    id: int
    name:str
    email:str
    phoneNumber: str = None
    isActive: Optional[bool] = None
    location: str
    dateAdded: datetime

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
    id: int
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
    id: int
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
    trackingStage: str = None
    
    class Config():
        orm_mode = True
        
class Feedback(BaseModel):
    foodId: int
    comment: str
    stars: int

    class Config():
        orm_mode = True
        
class ShowFeedback(BaseModel):
    id: int
    foodId: int
    comment: str
    stars: int
    commentedBy: int
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
    id: int
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
    user_id: int = None
    role_id: int = None
    class Config:
        orm_mode = True
    
class Msg(BaseModel):
    msg: str
    
class BulkUser(BaseModel):
    fullName:str
    email:str
    
    class Config():
        orm_mode = True


class CreatePayment(BaseModel):
    companyId: int
    amountPaid: float
    paymentType: str = None
    modifyBy: int = None
    paidBy: str
    transactionId: str
    class Config():
        orm_mode = True

class ShowPayment(BaseModel):
    id:int = None
    companyId: int
    amountPaid: float = None
    paymentType: str = None
    modifyBy: int = None
    paidBy: str
    transactionId: str
    balance: float = None
    datePaid: datetime = None
    class Config():
        orm_mode = True

class CreateCost(BaseModel):
    companyId: int
    totalCost: float
    generatedBy: int = None
    class Config():
        orm_mode = True

class ShowCost(BaseModel):
    id:int
    companyId: int
    totalCost: float
    generatedBy: int = None
    dateGenerated: datetime
    class Config():
        orm_mode = True


class ShowUserOrder(BaseModel):
    Food: ShowFood 
    Order: ShowOrder 
    Rider: ShowRider  = None
    class Config():
        orm_mode = True

class ShowUserDetails(BaseModel):
    id: int
    fullName:str
    email:str
    dateCreated: datetime
    isActive: bool
    companyName:str
    companyIsActive: Optional[bool] = None
    location: str
    totalFeedback: int = None
    totalOrder: int = None
    class Config():
        orm_mode = True


class Resource(BaseModel):
    url: str
    class Config():
        orm_mode = True