from pydantic import BaseModel

class CodeCreate(BaseModel):
    code: str

class CodeResponse(BaseModel):
    id: int
    code: str
    output: str

    class Config:
        orm_mode = True
