import {Component, input, OnInit} from '@angular/core';
import {AppointmentModel} from '../../models/appointment.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppointmentService} from '../../services/appointment.service';
import {NewAppointmentModel} from '../../models/new-appointment.model';

@Component({
  selector: 'app-appointment-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit {

  // Datos de cita se proporcionan en caso de modificación, para citas nuevas, estarán undefined.
  protected appointmentData = input<AppointmentModel | undefined>();
  protected appointmentId = input<number | undefined>();

  public constructor(private appointmentService: AppointmentService) {}

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    appDateTime: new FormControl(new Date(), Validators.required),
    dateOfBirth: new FormControl(new Date(), Validators.required),
  })

  ngOnInit(): void {

    // Llenar el formulario con los datos proporcionados en caso de modificación.
    if (this.appointmentId !== undefined && this.appointmentData() !== undefined) {

      this.form.controls.name.patchValue(this.appointmentData()!.name);
      this.form.controls.surname.patchValue(this.appointmentData()!.surname);
      this.form.controls.dni.patchValue(this.appointmentData()!.dni);
      this.form.controls.dateOfBirth.patchValue(this.appointmentData()!.dateOfBirth);
      this.form.controls.appDateTime.patchValue(this.appointmentData()!.dateAndTime);

    }

  }

  protected handleSubmit() {

    const app : NewAppointmentModel = {
      name: this.form.controls.name.value!,
      surname: this.form.controls.surname.value!,
      phoneNumber: this.form.controls.phone.value!,
      dni: this.form.controls.dni.value!,
      dateOfBirth: this.form.controls.dateOfBirth.value!,
      dateAndTime: this.form.controls.appDateTime.value!,
    };

    this.appointmentService.saveNewAppointment(app);

    alert("Saved successfully.");

  }

}
