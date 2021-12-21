from typing import List, Optional
from pydantic import BaseModel
from models.models import Order

class User(BaseModel):
    name:str
    email:str
    password:str

# class ShowUser(BaseModel):
#     name:str
#     email:str
#     orders : List[Order] =[]
#     class Config():
#         orm_mode = True
