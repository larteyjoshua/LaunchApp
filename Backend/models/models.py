from sqlalchemy import Column, Table,Integer, String, ForeignKey, DateTime, TIMESTAMP, Float, Boolean, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from utils.database import Base
from datetime import datetime

association_table = Table('association', Base.metadata,
    Column('company_id', ForeignKey('company.id'), primary_key=True),
    Column('user_id', ForeignKey('users.id'), primary_key=True)
)
class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    location = Column(String)
    isActive = Column(Boolean(), default=True)
    phoneNumber = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    addedBy = Column(Integer, ForeignKey('users.id'))
    users =relationship(
        "User",
        secondary=association_table,
        back_populates="company")
    orders = relationship("Order")
    account = relationship("Account", uselist=False, back_populates="company")

class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    description = Column(Text)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)

# class User(Base):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True, index=True)
#     fullName = Column(String)   
#     email = Column(String, unique=True, index=True)
#     password = Column(String)
#     date = Column(DateTime, default=datetime.now, onupdate=datetime.now)
#     is_active = Column(Boolean(), default=True)
#     companyId =  Column(Integer, ForeignKey('company.id'))
#     company = relationship("Company", back_populates="users")
#     orders = relationship("Order")
#     feedbacks = relationship("Feedback")

class UserRole(Base):
    __tablename__ = "user_roles" 
    user_id = Column(Integer,ForeignKey("users.id"), primary_key=True, nullable=False, index = True)
    role_id = Column(Integer, ForeignKey("roles.id"), primary_key=True,nullable=False, index =  True)
    role = relationship("Role")
    user = relationship("User", back_populates="user_role", uselist=False)

    __table_args__ = (
        UniqueConstraint("user_id", "role_id", name="unique_user_role"),
    )

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    fullName = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    dateCreated = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    isActive = Column(Boolean(), default=True)
    companyId =  Column(Integer, ForeignKey('company.id'))
    company =  relationship(
        "Company",
        secondary=association_table,
        back_populates="users")
    foods = relationship("Food", back_populates="foodowner")
    riders = relationship("Rider")
    orders = relationship("Order")
    feedbacks = relationship("Feedback")
    user_role = relationship("UserRole", back_populates="user", uselist=False)
    
class Food(Base):
    __tablename__ = 'foods'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    ingredients = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    price = Column(Float)
    addedBy = Column(Integer, ForeignKey('users.id'))
    imagePath = Column(String)
    foodowner = relationship("User", back_populates="foods")
    

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
    riderowner = relationship("Rider", back_populates="orders")
    companyowner = relationship("Company", back_populates="orders")
    foods = relationship("Food", backref="orders")

class Feedback(Base):
    __tablename__ = 'feedbacks'
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
    addedBy = Column(Integer, ForeignKey('users.id'))
    orders = relationship("Order", back_populates="riderowner")
    manager = relationship("User", back_populates="riders")

class Account(Base):
    __tablename__ = 'accounts'
    id = Column(Integer, primary_key = True, index =True)
    companyId = Column(Integer, ForeignKey('company.id'))
    totalCost = Column(Float)
    amountPaid = Column(Float)
    balance = Column(Float)
    modifyBy = Column(Integer, ForeignKey('users.id'))
    dateModified = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    company = relationship("Company", back_populates="account")
    foods = relationship("User", backref="accounts")