from sqlalchemy import Column, Integer, String
from .database import Base

class CodeSubmission(Base):
    __tablename__ = "code_submissions"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, nullable=False)
    output = Column(String)
