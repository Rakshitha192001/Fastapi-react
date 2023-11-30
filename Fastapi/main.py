
from fastapi import FastAPI, HTTPException, Depends,Response
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List

from database import SessionLocal, engine
import model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransactionBase(BaseModel):
    name: str
    description: str
    email:str
    is_income: bool

class TransactionModel(TransactionBase):
    id: int
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

model.Base.metadata.create_all(bind=engine)

@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: Session = Depends(get_db)):
    try:
        db_transaction = model.Transaction(**transaction.dict())
        db.add(db_transaction)
        db.commit()
        db.refresh(db_transaction)
        return db_transaction
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/transactions/")
async def read_transaction(db: Session = Depends(get_db)):
    try:
        transactions = db.query(model.Transaction).all()
        return transactions
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@app.delete('/transactions/{id}', status_code=204)
def delete_transaction(id: int, db: Session = Depends(get_db)):
    db_transaction = db.query(model.Transaction).filter(model.Transaction.id == id).first()
    
    if not db_transaction:
        raise HTTPException(status_code=404, detail="Not found")
    
    db.delete(db_transaction)
    db.commit()
    
    return {"message":"deleted successfully"}

# @app.put('/blog/{id}', status_code=202)
# def update(id, request: TransactionBase, db: Session = Depends(get_db)):
#     blog = db.query(model.Transaction).filter(model.Transaction.id == id)
#     if not blog.first():
#         raise HTTPException(status_code=404,detail="Not found")
    
#     blog.update(request.dict())
#     db.commit()
#     return {'message': 'updated successfully'}



