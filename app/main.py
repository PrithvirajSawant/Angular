from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from requests import Session
from emp_database import get_db, Base, engine
from models import Employee
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

class create_Request(BaseModel):
    id : str
    first_name : str
    last_name : str
    contact_number : int
    email : str
    dept : str
    designation : str
    password : str
    

class LoginRequest(BaseModel):
    email: str
    password: str
    
db_dependency = Annotated[Session, Depends(get_db)]

# Allow AngularJS frontend to access FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5501"],  # Add your AngularJS app's URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/login')
async def login(login_request : LoginRequest, db:db_dependency ):
    emp = db.query(Employee).filter(Employee.email == login_request.email).first()
    if not emp or emp.password != login_request.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"message": "Login successful", "emp_id": emp.id , "emp_name" : emp.first_name}

@app.post('/create_emp')
async def add(create_request: create_Request, db:db_dependency):
    create_emp_model = Employee(
        id=create_request.id,
        first_name = create_request.first_name,
        last_name = create_request.last_name,
        contact_number = create_request.contact_number,
        email = create_request.email,
        dept = create_request.dept,
        designation = create_request.designation,
        password = create_request.password
    )
    db.add(create_emp_model)
    db.commit()
    # if request.username == 'test' and request.password == '1234':
    #     return {"message": "Login successful!"}
    # return {"message": "User Created Successfully"}
    return {"message": "Emp Created Successfully", "employee": create_emp_model.id}
