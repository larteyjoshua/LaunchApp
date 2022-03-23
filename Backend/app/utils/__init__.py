from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from typing import List, Optional
from pydantic import BaseModel
from datetime import  datetime