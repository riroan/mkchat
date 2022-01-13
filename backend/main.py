from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Message(BaseModel):
    text : str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

l = []

@app.get("/")
async def root():
    return {"message":"Hello world"}

@app.post("/msg")
async def send_msg(msg:Message):
    l.append(msg.text)
    return msg

@app.get("/msg")
async def get_msg():
    return {"msg":l}