import { Injectable } from '@angular/core';
import {AppointmentModel} from '../models/appointment.model';
import {NewAppointmentModel} from '../models/new-appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  public saveNewAppointment(data : NewAppointmentModel): void {

    let appsString = localStorage.getItem('appointments');

    // Solo buscar el ID del último si ya hay citas.
    if (appsString) {

      let apps : AppointmentModel[] = JSON.parse(appsString);

      // Obtener el ID del último y sumarle uno para el siguiente.
      const nextId = apps[apps.length - 1].id + 1;

      const newApp : AppointmentModel = {
        id: nextId,
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        dni: data.dni,
        dateOfBirth: data.dateOfBirth,
        dateAndTime: data.dateAndTime
      };

      apps.push(newApp);
      localStorage.setItem('appointments', JSON.stringify(apps));

    } else { // Usar ID 1 para primera entrada.

      const newApp : AppointmentModel = {
        id: 1,
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        dni: data.dni,
        dateOfBirth: data.dateOfBirth,
        dateAndTime: data.dateAndTime
      };

      let toSave : AppointmentModel[] = [];
      toSave.push(newApp);

      localStorage.setItem('appointments', JSON.stringify(toSave));

    }

  }

}
