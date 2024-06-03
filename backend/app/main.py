from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from app import models, schemas, crud, database
import subprocess

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Python Code Executor API"}

@app.post("/test_code/")
def test_code(code: schemas.CodeCreate):
    try:
        result = subprocess.run(
            ["python3", "-c", code.code],
            capture_output=True,
            text=True,
            timeout=5,
            check=True
        )
        return {"output": result.stdout, "error": result.stderr}
    except subprocess.CalledProcessError as e:
        return {"output": e.stdout, "error": e.stderr}
    except subprocess.TimeoutExpired:
        return {"output": "", "error": "Execution timed out"}

@app.post("/submit_code/", response_model=schemas.CodeResponse)
def submit_code(code: schemas.CodeCreate, db: Session = Depends(database.get_db)):
    try:
        result = subprocess.run(
            ["python3", "-c", code.code],
            capture_output=True,
            text=True,
            timeout=5,
            check=True
        )
        db_code = crud.create_code(db=db, code=code.code, output=result.stdout)
        return db_code
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=400, detail="Code execution failed")
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=400, detail="Execution timed out")
