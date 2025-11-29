import { Component, input, OnInit, signal } from '@angular/core';
import { HeaderBarComponent } from "../../components/header-bar/header-bar.component";
import { Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentModel } from '../../models/appointment.model';
import { AppointmentFormComponent } from "../../components/appointment-form/appointment-form.component";

@Component({
  selector: 'app-update-appointment',
  imports: [HeaderBarComponent, RouterLink, AppointmentFormComponent],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})
export class UpdateAppointmentComponent implements OnInit {

  // ID de la ruta llenado con component input binding.
  // Aunque lo pongas como number, siempre se va a interpretar como string, mejor castearlo despues.
  protected id = input<string>();

  protected appId = signal<number | undefined>(undefined);

  protected app = signal<AppointmentModel | undefined>(undefined);

  constructor(private readonly router : Router, private readonly appointmentService : AppointmentService){}

  ngOnInit(): void {
    
    if (!this.id()){
      this.router.navigate(['/']);
    }

    this.appId.set(parseInt(this.id()!));

    const app = this.appointmentService.getAppointmentById(this.appId()!);

    if (!app) {
      this.router.navigate(['/']);
    }

    this.app.set(app!);

  }

}
