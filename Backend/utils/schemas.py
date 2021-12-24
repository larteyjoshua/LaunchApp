from typing import List, Optional
from pydantic import BaseModel
from models.models import Order

class User(BaseModel):
    fullName:str
    email:str
    companyId: Optional[int] = None

    class Config():
        orm_mode = True

class ShowUser(BaseModel):
    id: int
    fullName:str
    email:str
    password: str
    companyId: Optional[int] = None
    is_active: bool
    
    class Config():
        orm_mode = True


class ShowAdmin(BaseModel):
    id: int
    fullName:str
    email:str
    password: str
    roleId: Optional[int] = None
    isActive: bool
    isSuper: bool
    
    class Config():
        orm_mode = True
        
        
        
class Admin(BaseModel):
    fullName:str
    email:str
    password: str
    isSuper: Optional[bool] = None
    roleId: Optional[int] = None

    class Config():
        orm_mode = True        