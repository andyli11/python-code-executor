from sqlalchemy.orm import Session
from . import models, schemas

def create_code(db: Session, code: str, output: str):
    db_code = models.CodeSubmission(code=code, output=output)
    db.add(db_code)
    db.commit()
    db.refresh(db_code)
    return db_code
