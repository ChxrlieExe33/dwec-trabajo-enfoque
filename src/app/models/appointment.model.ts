export type AppointmentModel = {
  dateAndTime: Date,
  name: string,
  surname: string,
  dni: string,
  phoneNumber: string, // String porque a lo mejor contiene un código de pais como +39
  dateOfBirth: Date,
}
