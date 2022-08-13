from app.billingCeleryJobs.celeryWorker import celery, celery_log
from app.emails import billingEmail
import time
import json
from json import JSONEncoder
from sqlalchemy.orm import Session
from app.emails import billingEmail
from app.billingCeleryJobs import billGeneration, balanceCalc
from app.utils import database

get_db = database.get_db

# @celery.autodiscover_tasks()
@celery.task(name ='app.billingCeleryJobs.tasks.bill_creation')
def bill_creation():
    # db: Session = Depends(get_db)
    billGeneration.generateBills()
   
    return {"message": "Bill Generation runs"}
    
@celery.task(name ='app.billingCeleryJobs.tasks.sum_number')
def sum_number(x, y):
    add = x + y
    celery_log.info("I am suppose to run")
    return add

@celery.task(name ='app.billingCeleryJobs.tasks.sendBillingEmail')
def sendBillingEmail(email:str, fullName: str, month: str, amount:str, location =None, orders =None, invoiceNo = None):
    time.sleep(5)
    celery_log.info("I am suppose to run")
    respon = billingEmail.sendBilling( email, fullName, month, amount, location, orders, invoiceNo)
    return respon

@celery.task(name ='app.billingCeleryJobs.tasks.balance_calculation')

def balance_calc(companyId: int, paymentId):
    time.sleep(5)
    balanceCalc.balanceCalculation(companyId, paymentId)
    return {"message": "Balance Calculation runs"}