import { Component, OnInit, signal } from '@angular/core';
import { HeaderBarComponent } from "../../components/header-bar/header-bar.component";
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentModel } from '../../models/appointment.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-appointments',
  imports: [HeaderBarComponent, DatePipe, RouterLink],
  templateUrl: './all-appointments.component.html',
  styleUrl: './all-appointments.component.css'
})
export class AllAppointmentsComponent implements OnInit {

  protected apps = signal<AppointmentModel[]>([]);

  constructor (protected appointmentService : AppointmentService) {}

  ngOnInit(): void {
    
    this.apps.set(this.appointmentService.getAllAppointments());

  }

}
