from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, TIMESTAMP, text, Float, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from utils.database import Base
from datetime import datetime

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    location = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    addedBy = Column(Integer, ForeignKey('managers.id'))
    manager = relationship("Manager", back_populates="companies")
    users = relationship("User", back_populates="company")
    orders = relationship("Order", back_populates="companyowner")
    companyowner = relationship("Account", back_populates="companies")

class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    addedBy = Column(Integer, ForeignKey('managers.id'))
    roleowner = relationship("Manager", back_populates="roles")

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
    orders = relationship("Order", back_populates="orderowner")

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
    companies = relationship("Company", back_populates="manager")
    roles = relationship("Role", back_populates="roleowner")
    foods = relationship("Food", back_populates="foodowner")

class Food(Base):
    __tablename__ = 'foods'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    ingredients = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    price = Column(Float)
    addedBy = Column(Integer, ForeignKey('users.id'))
    imagePath = Column(String)
    foodowner = relationship("Manager", back_populates="foods")

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, index=True)
    orderDate = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    companyId = Column(Integer, ForeignKey('company.id'))
    cost = Column(Float)
    riderId = Column(Integer, ForeignKey('riders.id'))
    userId = Column(Integer, ForeignKey('users.id'))
    orderowner = relationship("User", back_populates="orders")
    riderowner = relationship("Rider", back_populates="orders")
    companyowner = relationship("Company", back_populates="orders")

class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column(Integer, primary_key =True, index = True)
    foodId = Column(Integer, ForeignKey('foods.id'))
    comment = Column(String)
    stars = Column(Integer)
    dateCommented = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    commentedBy = Column(Integer, ForeignKey('users.id'))
    owner = relationship("User", back_populates="items")

    __tablename__ = 'riders'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    motorNumber = Column(String)
    tellNumber = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    orders = relationship("Order", back_populates="riderowner")

class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key = True, index =True)
    companyId = Column(Integer, ForeignKey('company.id'))
    totalCost = Column(Float)
    amountPaid = Column(Float)
    balance = Column(Float)
    modifyBy = Column(Integer, ForeignKey('managers.id'))
    dateModified = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    companies = relationship("Company", back_populates="companyowner")

