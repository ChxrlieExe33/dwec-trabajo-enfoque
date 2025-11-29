import { Component, OnInit, signal } from '@angular/core';
import { HeaderBarComponent } from "../../components/header-bar/header-bar.component";
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentModel } from '../../models/appointment.model';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-appointments',
  imports: [HeaderBarComponent, DatePipe, RouterLink],
  templateUrl: './all-appointments.component.html',
  styleUrl: './all-appointments.component.css'
})
export class AllAppointmentsComponent implements OnInit {

  protected apps = signal<AppointmentModel[]>([]);

  constructor (protected appointmentService : AppointmentService, private readonly router : Router) {}

  ngOnInit(): void {
    
    this.apps.set(this.appointmentService.getAllAppointments());

  }

  protected navigateToUpdateAppointment(appId: number) {

    this.router.navigate(['/update-appointment', appId]);

  }

  protected handleClickedDelete(appId : number) {

    if (!confirm('Estás seguro que quieres borrar cita con ID ' + appId)) {
      return;
    }

    this.appointmentService.deleteAppointmentById(appId);

    this.apps.set(this.apps().filter(a => a.id !== appId));

  }

}
