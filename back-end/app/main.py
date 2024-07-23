from fastapi import FastAPI, HTTPException
from datetime import date
from typing import List
from .models import Appointment
from .crud import save_appointment, get_appointments_by_date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Taller de Patrones de diseño 1!"}

@app.post("/appointments/",  response_model=Appointment)
def create_appointment(appointment: Appointment):
    print(f"Creating appointment: {appointment}")
    save_appointment(appointment)
    return appointment

@app.get("/appointments/", response_model=List[Appointment])
def read_appointments(date_str: str):
    try:
        appointment_date = date.fromisoformat(date_str)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")
    appointments = get_appointments_by_date(appointment_date)
    return appointments

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
