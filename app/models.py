from emp_database import Base
from sqlalchemy import Column, Integer, String

class Employee(Base):
    __tablename__ = "employee"
    id=Column(String(100) ,primary_key=True,index=True,unique=True)
    first_name=Column(String(100))
    last_name=Column(String(100))
    contact_number=Column(String(100))
    email=Column(String(100), unique=True)
    dept=Column(String(100))
    designation=Column(String(100))
    password = Column(String(100))
    # email=Column(String(100),unique=True)
    # password=Column(String()) 