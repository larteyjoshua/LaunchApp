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
