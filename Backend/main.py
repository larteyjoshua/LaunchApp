from fastapi import FastAPI
from models import  models
from utils.database import SessionLocal, engine
from routers import users, admin, roles

models.Base.metadata.create_all(bind=engine)
#models.Base.metadata.drop_all(bind =engine)

app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(users.router)
app.include_router(admin.router)
app.include_router(roles.router)