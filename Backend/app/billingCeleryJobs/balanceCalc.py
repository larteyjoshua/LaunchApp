from sqlalchemy.orm import Session, sessionmaker
from app.billingCeleryJobs import tasks
from app.utils import config, schemas
from sqlalchemy import create_engine 
from app.models import models
from app.billingCeleryJobs.celeryWorker import celery_log

def balanceCalculation(companyId:int, paymentId):

       
        db_string = config.settings.SQLALCHEMY_DATABASE_URI
        con = create_engine(db_string)  
        Session = sessionmaker(con)  
        db = Session()


        celery_log.info('CompanyId === ' + str(companyId))
        celery_log.info('PaymentId === ' + str(paymentId))

        balance:float = 0
        costs = db.query(models.OrderCost).filter(models.OrderCost.companyId == companyId).all()
        print(costs)
        totalCost = sum(cost.totalCost for cost in costs)

        celery_log.info('totalCost === ' + str(totalCost))

        payments = db.query(models.Payment).filter(models.Payment.companyId == companyId).all()
        totalPayment = sum(payment.amountPaid for payment in payments)
        
        celery_log.info('totalPayment === ' + str(totalPayment))
        balance = totalCost - totalPayment

        celery_log.info('Balance=====' + str(balance))

        payment = db.query(models.Payment).filter(models.Payment.id == paymentId).first()

        payment.balance = balance
        new_job = models.JobsRun(jobName = 'Balance Calculation Job')

        db.add(new_job)
        db.commit()

        db.expunge_all()    
        db.close()   

