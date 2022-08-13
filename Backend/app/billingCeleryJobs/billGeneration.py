from sqlalchemy.orm import Session
from app.models import models
from datetime import datetime, timedelta
from sqlalchemy import and_
from fastapi import BackgroundTasks
from app.emails import billingEmail
import calendar
from app.billingCeleryJobs import tasks
from pydantic import parse_obj_as

from sqlalchemy import create_engine  
from sqlalchemy import Column, String  
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker
from app.utils import config, schemas
from typing import List


import logging

def generateBills():
     db_string = config.settings.SQLALCHEMY_DATABASE_URI
     con = create_engine(db_string)  
     Session = sessionmaker(con)  
     db = Session()
     # results = db.execute('select * from orders')
     # print(results)
     connection = con.raw_connection()
     cursor = connection.cursor()
     
     fifteen_days_ago = datetime.today() - timedelta(days = 15)
     companies = db.query( models.Company).all()
     print('days',fifteen_days_ago)
     print('Total Companies', len(companies))
     foodCost = 0
    
     for company in companies:
         
          companyData = company
          # companyCost = db.query(models.Order).filter(models.Order.companyId == companyData.id and models.Order.orderDate <= fifteen_days_ago).all()
          cursor.execute("SELECT * FROM GerOrdersByCompanyId( %s, %s); ",(companyData.id,'15 Day'))
          companyCost =cursor.fetchall()
          print(companyCost)
          foodCost = sum(com[3] for com in companyCost)
          print('foodData',foodCost)
          print('id', companyCost[0][6])

     if foodCost > 0 :
          companyAdmin = db.query(models.Company).filter(models.Company.id ==  companyCost[0][6]).first()
         
          new_cost =  models.OrderCost(companyId = companyData.id,
                                        totalCost = foodCost,
                                        generatedBy = 55)

          datem = datetime.strptime(str(companyData.dateAdded), "%Y-%m-%d %H:%M:%S.%f")
          month =  calendar.month_name[datem.month]
          print('month', month)
          print('companyEmail',companyAdmin.email)
               
          print(new_cost)
          db.add(new_cost)
          db.commit()
          db.refresh(new_cost)

          new_job = models.JobsRun(jobName = 'Bill Generation')
          db.add(new_job)
          db.commit()
          if companyAdmin is not None:
                    print('leng readings',len(companyCost))
                    task = tasks.sendBillingEmail.delay( companyAdmin.email, companyAdmin.name, month, str(foodCost), companyAdmin.location, companyCost, new_cost.id)
                    logging.info("Cost bill generate for Compay" + companyAdmin.name)
     db.expunge_all()    
     db.close()   
     