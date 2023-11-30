from database import Base
from sqlalchemy import Column,Integer,String,Boolean

class Transaction(Base):
    __tablename__="Transaction"
    
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String)
    email=Column(String)
    description=Column(String)
    is_income=Column(Boolean)