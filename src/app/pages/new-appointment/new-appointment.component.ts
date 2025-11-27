import { Component } from '@angular/core';
import {HeaderBarComponent} from '../../components/header-bar/header-bar.component';
import {AppointmentFormComponent} from '../../components/appointment-form/appointment-form.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  imports: [
    HeaderBarComponent,
    AppointmentFormComponent,
    RouterLink
  ],
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.css'
})
export class NewAppointmentComponent {

}
