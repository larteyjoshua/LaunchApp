from fastapi import FastAPI, Request, Depends
from . import models
from .utils.database import engine
from .routers import userLogin, userActivities, superAdminActivities, adminactivities
from fastapi.middleware.cors import CORSMiddleware
from app.utils.config import settings
from app.routers.basicRouters import users, admin, roles, company, riders, foods, orders, feedbacks, account 
from app.utils import initialsdb
from sqlalchemy.orm import Session
from app.utils import database

#models.Base.metadata.create_all(bind=engine)

description = """
LunchApp API helps you to booked your launch from a service provider and 
got it deliver to your office with payment manage by company. 🚀

## Admins

You can **manage the this system**.

## Users

You will be able to:

* **Create users**.
* **book launch** .
"""
app = FastAPI(
    title = settings.PROJECT_NAME,
    description = description,
    contact={
        "name": "Joshua Lartey",
        "url": "https://www.linkedin.com/in/joshua-lartey-2ba404199/",
        "email": "larteyjoshua@gmail.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    }
    
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
get_db = database.get_db

# @app.on_event("startup")
# async def startup_event():
    
    
    
@app.get("/l")
async def home():
    return {"message": "Hello World"}

@app.get("/dbiniit")
async def db_init(db: Session = Depends(get_db)):
        return initialsdb.databaseinit(db)

# @app.get("/")
# async def home():
#     return {"message": "Hello World"}

@app.get("/requestinfo")
def info(request: Request):
    print(request.url)
    hostPort = request.client.port
    hostName = request.client.host
    url = request.url._url
    return { "hostName": hostName, "port": hostPort, "url": url }
    
# app.include_router(users.router)
# app.include_router(admin.router)
# app.include_router(roles.router)
# app.include_router(company.router)
# app.include_router(riders.router)
# app.include_router(foods.router)
# app.include_router(orders.router)
# app.include_router(feedbacks.router)
# app.include_router(account.router)

app.include_router(userLogin.router)
app.include_router(userActivities.router)
app.include_router(adminactivities.router)
app.include_router(superAdminActivities.router)

