import { Routes } from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {NewAppointmentComponent} from './pages/new-appointment/new-appointment.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'new-appointment',
    component: NewAppointmentComponent,
  }
];
