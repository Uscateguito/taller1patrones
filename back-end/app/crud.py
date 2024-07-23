import json
from datetime import date, time
from pathlib import Path
from datetime import date
from .models import Appointment

BASE_PATH = Path("./appointments")

def save_appointment(appointment: Appointment):
    # Convertir el objeto a un diccionario y serializar fecha y hora como cadenas
    appointment_data = appointment.dict()
    appointment_data['fecha'] = appointment.fecha.isoformat()
    appointment_data['hora'] = appointment.hora.isoformat()

    date_folder = appointment.fecha.strftime("%Y%m%d")
    base_path = BASE_PATH / date_folder
    base_path.mkdir(parents=True, exist_ok=True)

    file_path = base_path / f"{appointment.cedula}.json"
    with open(file_path, "w") as f:
        json.dump(appointment_data, f)

def get_appointments_by_date(appointment_date: date):
    date_folder = appointment_date.strftime("%Y%m%d")
    base_path = BASE_PATH / date_folder
    if not base_path.exists():
        return []

    appointments = []
    for file in base_path.glob("*.json"):
        try:
            with open(file, "r") as f:
                appointment_data = json.load(f)
                # Convertir fecha y hora de cadenas a objetos de tipo date y time
                appointment_data['fecha'] = date.fromisoformat(appointment_data['fecha'])
                appointment_data['hora'] = time.fromisoformat(appointment_data['hora'])
                appointment = Appointment(**appointment_data)
                appointments.append(appointment)
        except json.JSONDecodeError as e:
            print(f"Error al leer el archivo JSON: {e}")
        except Exception as e:
            print(f"Error inesperado: {e}")
    return appointments
