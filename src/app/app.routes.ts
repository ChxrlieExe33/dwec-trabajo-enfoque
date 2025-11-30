import { Routes } from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {NewAppointmentComponent} from './pages/new-appointment/new-appointment.component';
import { AllAppointmentsComponent } from './pages/all-appointments/all-appointments.component';
import { UpdateAppointmentComponent } from './pages/update-appointment/update-appointment.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'new-appointment',
    component: NewAppointmentComponent,
  },
  {
    path: 'all-appointments',
    component: AllAppointmentsComponent
  },
  {
    path: 'update-appointment/:id',
    component: UpdateAppointmentComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: "full"
  }
];
