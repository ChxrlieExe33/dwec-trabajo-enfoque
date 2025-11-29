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

  public getAllAppointments() : AppointmentModel[] {

    const data = localStorage.getItem('appointments');

    if (!data) {
      return [];
    }

    return JSON.parse(data);

  }

  public getAppointmentById(appId: number) : AppointmentModel | undefined {

    const data = localStorage.getItem('appointments');

    if (!data) {
      console.warn('Cita con ID ' +  appId + ' no existe.');
      return undefined;
    }

    let apps : AppointmentModel[] = JSON.parse(data);

    const app = apps.find(a => a.id === appId);

    return app;

  }

  public updateAppointmentById(appId: number, appData: NewAppointmentModel) {

    const data = localStorage.getItem('appointments');

    if (!data) {
      console.warn('No hay citas todavía');
      return;
    }

    const apps : AppointmentModel[] = JSON.parse(data);

    const appointment = apps.find(a => a.id === appId);

    if (!appointment) {
      console.warn('Cita con ID ' +  appId + ' no existe.');
      return;
    }
    
    // Mapear el array existente, actualizando el registro cuando se encuentra.
    const updatedApps : AppointmentModel[] = apps.map(a => {
      if (a.id === appId) {
        a.name = appData.name;
        a.surname = appData.surname;
        a.dni = appData.dni;
        a.phoneNumber = appData.phoneNumber;
        a.dateOfBirth = appData.dateOfBirth;
        a.dateAndTime = appData.dateAndTime;
      }
      return a;
    });

    localStorage.setItem('appointments', JSON.stringify(updatedApps));

  }

  public deleteAppointmentById(appId: number) {

    const data = localStorage.getItem('appointments');

    if (!data) {
      console.warn('No hay citas todavía');
      return;
    }

    const apps : AppointmentModel[] = JSON.parse(data);

    const appointment = apps.find(a => a.id === appId);

    if (!appointment) {
      console.warn('Cita con ID ' +  appId + ' no existe.');
      return;
    }

    const updated = apps.filter(a => a.id !== appId);

    if (updated.length === 0) {
      localStorage.removeItem('appointments');
    } else {
      localStorage.setItem('appointments', JSON.stringify(updated));
    }

    
  }

}
