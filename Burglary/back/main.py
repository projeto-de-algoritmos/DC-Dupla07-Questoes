from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from startGame import start_game

app = FastAPI()

class ItemAmount(BaseModel):
    total_itens: int

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/burglar")
async def game(itemAmount: ItemAmount):
    total_itens = itemAmount.total_itens
    ans = start_game(total_itens)
    count = 1
    while 1:
        if ans[0][0] == 0 and count <= 3:
            count += 1
            ans = start_game(total_itens)
        else:
            return ans

