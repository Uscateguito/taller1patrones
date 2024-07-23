from pydantic import BaseModel
from datetime import date, time

class Appointment(BaseModel):
    cedula: int
    nombre: str
    apellido: str
    edad: int
    fecha: date
    hora: time
