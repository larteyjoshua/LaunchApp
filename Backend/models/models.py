from sqlalchemy import Column, Integer, String, ForeignKey
from blog.database import Base
from sqlalchemy.orm import relationship
import datetime

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    location = Column(String)
    dateAdded = Column(DateTime)
    addedBy = Column(Integer, ForeignKey('managers.id'))

class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    dateAdded = Column(DateTime)
    addedBy = Column(Integer, ForeignKey('mangers.id'))

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String)
    email = Column(String)
    password = Column(String)
    date = Column(DateTime)
    is_active = Column(Boolean(), default=True)
    companyId =  Column(Integer, ForeignKey('company.id'))

class Manager(Base):
    __tablename__ = 'managers'
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String)
    email = Column(String)
    password = Column(String)
    date = Column(DateTime)
    isActive = Column(Boolean(), default=True)
    isSuper = Column(Boolean(), default=False)
    roleId =  Column(Integer, ForeignKey('roles.id'))

class Food(Base):
    __tablename__ = 'foods'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    ingredients = Column(String)
    dateAdded = Column(DateTime)
    price = Column(float)
    addedBy = Column(Integer, ForeignKey('users.id'))
    imagePath = Column(String)

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, index=True)
    orderDate = Column(DateTime)
    companyId = Column(Integer, ForeignKey('company.id'))
    cost = Column(float)
    riderId = Column(Integer, ForeignKey('riders.id'))
    userId = Column(Integer, ForeignKey('users.id'))

class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column(Integer, primary_key =True, index = True)
    foodId = Column(Integer, ForeignKey('users.id'))
    comment = Column(String)
    stars = Column(Integer)
    dateCommented = Column(DateTime)
    commentedBy = Column(Integer, ForeignKey('users.id'))
    
class Rider(Base):
    __tablename__ = 'riders'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    motorNumber = Column(String)
    tellNumber = Column(String)

class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key = True, index =True)
    companyId = Column(Integer, ForeignKey('company.id'))
    totalCost = Column(floats)
    amountPaid = Column(float)
    balance = Column(float)
    modifyBy = Column(Integer, ForeignKey('managers.id'))

