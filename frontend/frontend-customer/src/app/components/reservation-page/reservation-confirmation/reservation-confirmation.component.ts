import { Component, Input, OnInit } from '@angular/core';
import { IConfirmation as IConfirmation } from '../reservation-page.component';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/Email';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent implements OnInit {
  
  @Input() inputParams!: IConfirmation;
  email : Email;
  constructor(private emailService: EmailService) {
    this.email = new Email({});
  }
  ngOnInit() {
    // This data is for testing purposes only.
    if(this.inputParams.isSuccess = true){
      this.email = this.createEmail();
      this.sendEmail(this.email);
    }
    this.inputParams.isSuccess = true;
    //this.inputParams.customerFullName = "Juan Pérez Vega";
    //this.inputParams.customerEmail = "juanito01@gmail.com";
    //this.inputParams.reservationNumber = "SSXX234XLJJKJLL";
  }

  createEmail(): Email{
    var newEmail = new Email({});
    newEmail.name = this.inputParams.customerFullName;
    newEmail.emailAdress = this.inputParams.customerEmail;
    newEmail.subject = '¡Reservación completada!';
    newEmail.body = 'Reservación realizada! \nGracias '+this.inputParams.customerFullName+'!! Su reservación fue realizada exitosamente. \nNúmero de reservación: '+this.inputParams.reservationNumber+'\nGracias por preferirnos!'
    return newEmail
  }

  sendEmail(email: Email){
    this.emailService.SendEmail(email).subscribe(data => {
      if (data.id == 1) {
        console.log(data.message)
      } else {
        console.log(data.message)
      }
    })
  }

  goBack() {
    this.inputParams.goBack();
  }
}