from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, TIMESTAMP, text, Float, Boolean, Enum
from sqlalchemy.orm import relationship
from utils.database import Base
from datetime import datetime

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    location = Column(String)
    isActive = Column(Boolean(), default=True)
    phoneNumber = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    addedBy = Column(Integer, ForeignKey('managers.id'))
    manager = relationship("Manager", back_populates="companies")
    users = relationship("User", back_populates="company")
    orders = relationship("Order")
    account = relationship("Account", uselist=False, back_populates="company")

class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String)   
    email = Column(String, unique=True, index=True)
    password = Column(String)
    date = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    is_active = Column(Boolean(), default=True)
    companyId =  Column(Integer, ForeignKey('company.id'))
    company = relationship("Company", back_populates="users")
    orders = relationship("Order")
    feedbacks = relationship("Feedback")

class Manager(Base):
    __tablename__ = 'managers'
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    date = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    isActive = Column(Boolean(), default=True)
    isSuper = Column(Boolean(), default=False)
    roleId =  Column(Integer, ForeignKey('roles.id'))
    companies = relationship("Company")
    foods = relationship("Food", back_populates="foodowner")
    roles = relationship("Role", backref="managers")
    riders = relationship("Rider")

class Food(Base):
    __tablename__ = 'foods'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    ingredients = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    price = Column(Float)
    addedBy = Column(Integer, ForeignKey('managers.id'))
    imagePath = Column(String)
    foodowner = relationship("Manager", back_populates="foods")
    

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, index=True)
    orderDate = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    foodId = Column(Integer, ForeignKey('foods.id'))
    companyId = Column(Integer, ForeignKey('company.id'))
    cost = Column(Float)
    totalNumber = Column(Integer)
    riderId = Column(Integer, ForeignKey('riders.id'))
    userId = Column(Integer, ForeignKey('users.id'))
    destination = Column(String)
    trackingStage =Column(String)
    isActive = Column(Boolean(), default=True)
    riderowner = relationship("Rider", back_populates="orders")
    companyowner = relationship("Company", back_populates="orders")
    foods = relationship("Food", backref="orders")

class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column(Integer, primary_key =True, index = True)
    foodId = Column(Integer, ForeignKey('foods.id'))
    comment = Column(String)
    stars = Column(Integer)
    dateCommented = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    commentedBy = Column(Integer, ForeignKey('users.id'))
    foods = relationship("Food", backref="feedback")


class Rider(Base):
    __tablename__ = 'riders'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    motorNumber = Column(String)
    tellNumber = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    addedBy = Column(Integer, ForeignKey('managers.id'))
    orders = relationship("Order", back_populates="riderowner")
    manager = relationship("Manager", back_populates="riders")

class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key = True, index =True)
    companyId = Column(Integer, ForeignKey('company.id'))
    totalCost = Column(Float)
    amountPaid = Column(Float)
    balance = Column(Float)
    modifyBy = Column(Integer, ForeignKey('managers.id'))
    dateModified = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    company = relationship("Company", back_populates="account")