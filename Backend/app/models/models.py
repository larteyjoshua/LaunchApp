from sqlalchemy import Column, Table,Integer, String, ForeignKey, DateTime, TIMESTAMP, Float, Boolean, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.utils.database import Base
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
    
    addedBy =relationship("User",secondary=association_table,back_populates="companies")
    orders = relationship("Order")
    payment = relationship("Payment", uselist=False, back_populates="company")
    cost = relationship("OrderCost", uselist=False, back_populates="company")
    

class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key =True, index = True)
    name = Column(String)
    description = Column(Text)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)


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
    companyId =  Column(Integer, ForeignKey('company.id'), nullable=True)
    companies =  relationship(
        "Company",
        secondary=association_table,
        back_populates="addedBy", primaryjoin= companyId == Company.id, post_update=True)
    user_role = relationship("UserRole", back_populates="user", uselist=False)
    payments = relationship("Payment", back_populates="modify_by")
   
    
class Food(Base):
    __tablename__ = 'foods'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    ingredients = Column(String)
    dateAdded = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    price = Column(Float)
    addedBy = Column(Integer, ForeignKey('users.id'))
    imagePath = Column(String)
    add_by = relationship('User',  primaryjoin = addedBy == User.id, post_update= True)
    

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, index=True)
    orderDate = Column(DateTime, default=datetime.now)
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
    belongTo = relationship('User',  primaryjoin = userId == User.id, post_update= True)

class Feedback(Base):
    __tablename__ = 'feedbacks'
    id = Column(Integer, primary_key =True, index = True)
    foodId = Column(Integer, ForeignKey('foods.id'))
    comment = Column(String)
    stars = Column(Integer)
    dateCommented = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    commentedBy = Column(Integer, ForeignKey('users.id'))
    foods = relationship("Food", backref="feedback")
    comment_by =relationship("User", primaryjoin= commentedBy == User.id, post_update=True)


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
    add_by =relationship("User", primaryjoin= addedBy == User.id, post_update=True)

# class Account(Base):
#     __tablename__ = 'accounts'
#     id = Column(Integer, primary_key = True, index =True)
#     companyId = Column(Integer, ForeignKey('company.id'))
#     totalCost = Column(Float)
#     amountPaid = Column(Float)
#     balance = Column(Float)
#     modifyBy = Column(Integer, ForeignKey('users.id'))
#     dateModified = Column(DateTime, default=datetime.now, onupdate=datetime.now)
#     company = relationship("Company", back_populates="account")
#     modify_by =relationship("User", primaryjoin= modifyBy == User.id, post_update=True)

class SotreSummary(Base):
    __tablename__ = 'storeSummaries'
    id = Column(Integer, primary_key = True, index =True)
    title = Column(String)
    value = Column(Integer)
    isIncrease = Column(Boolean())
    percentValue = Column(Float)
    color = Column(String)
    icon = Column(String)


class OrderCost(Base):
    __tablename__ = 'orderCost'
    id = Column(Integer, primary_key = True, index =True)
    companyId = Column(Integer, ForeignKey('company.id'))
    totalCost = Column(Float)
    generatedBy = Column(Integer, ForeignKey('users.id'))
    dateGenerated = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
    company = relationship("Company", back_populates="cost")
    modify_by =relationship("User", primaryjoin= generatedBy == User.id, post_update=True)


class Payment(Base):
    __tablename__ = 'payments'
    id = Column(Integer, primary_key = True, index =True)
    companyId = Column(Integer, ForeignKey('company.id'))
    amountPaid = Column(Float)
    paymentType = Column(String, nullable =False)
    modifyBy = Column(Integer, ForeignKey('users.id'))
    paidBy = Column(String, nullable = False)
    transactionId = Column(String, nullable = False)
    datePaid = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    balance =   Column(Float, nullable =True)
    
    company = relationship("Company", back_populates="payment")
    modify_by = relationship("User",  back_populates="payments")


class JobsRun(Base):
    __tablename__ = 'jobsRun'
    id = Column(Integer, primary_key = True, index =True)
    jobName = Column(String)
    runTime = Column(DateTime, default=datetime.now, onupdate=datetime.now)