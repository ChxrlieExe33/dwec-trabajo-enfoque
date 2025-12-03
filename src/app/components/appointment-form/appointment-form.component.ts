import {Component, input, OnInit} from '@angular/core';
import {AppointmentModel} from '../../models/appointment.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppointmentService} from '../../services/appointment.service';
import {NewAppointmentModel} from '../../models/new-appointment.model';
import { Router } from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-appointment-form',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit {

  // Datos de cita se proporcionan en caso de modificación, para citas nuevas, estarán undefined.
  public appointmentData = input<AppointmentModel | undefined>();
  public appointmentId = input<number | undefined>();

  public constructor(private appointmentService: AppointmentService, private router : Router) {}

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    dni: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^\\+?\\d+$'))]),
    appDateTime: new FormControl(new Date(), Validators.required),
    dateOfBirth: new FormControl(new Date(), Validators.required),
  })

  ngOnInit(): void {

    // Llenar el formulario con los datos proporcionados en caso de modificación.
    if (this.appointmentId !== undefined && this.appointmentData() !== undefined) {

      this.form.controls.name.patchValue(this.appointmentData()!.name);
      this.form.controls.surname.patchValue(this.appointmentData()!.surname);
      this.form.controls.dni.patchValue(this.appointmentData()!.dni);
      this.form.controls.phone.patchValue(this.appointmentData()!.phoneNumber);
      this.form.controls.dateOfBirth.patchValue(this.appointmentData()!.dateOfBirth);
      this.form.controls.appDateTime.patchValue(this.appointmentData()!.dateAndTime);

    }

  }

  // Métodos cortos para ver si el valor de cada control es válido, las cuales se reflejan en la interfaz.
  get nameInvalid() {
    return this.form.controls.name.invalid && this.form.controls.name.touched && this.form.controls.name.dirty
  }

  get surnameInvalid() {
    return this.form.controls.surname.invalid && this.form.controls.surname.touched && this.form.controls.surname.dirty
  }

  get dniInvalid() {
    return this.form.controls.dni.invalid && this.form.controls.dni.touched && this.form.controls.dni.dirty
  }

  get phoneInvalid() {
    return this.form.controls.phone.invalid && this.form.controls.phone.touched && this.form.controls.phone.dirty
  }

  get dobInvalid() {
    return this.form.controls.dateOfBirth.invalid && this.form.controls.dateOfBirth.touched && this.form.controls.dateOfBirth.dirty
  }

  get appDateTimeInvalid() {
    return this.form.controls.appDateTime.invalid && this.form.controls.appDateTime.touched && this.form.controls.appDateTime.dirty
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

    // Si se ha proporcionado datos de una cita ya existente al componente,
    // estamos en la página de actualizacion y queremos actualizar, en caso de que
    // no se ha proporcinado nada, estamos en la página de creación de cita.
    if (!this.appointmentData() && !this.appointmentId()) {

      this.appointmentService.saveNewAppointment(app);

    } else {

      this.appointmentService.updateAppointmentById(this.appointmentId()!, app);

    }

    this.router.navigate(['/all-appointments']);

  }

}
