import { Component, Input, OnInit } from '@angular/core';
import { IConfirmation as IConfirmation } from '../reservation-page.component';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent implements OnInit {
  
  @Input() inputParams!: IConfirmation;

  constructor() {}

  ngOnInit() {
    // This data is for testing purposes only.
    //this.inputParams.isSuccess = true;
    //this.inputParams.customerFullName = "Juan Pérez Vega";
    //this.inputParams.customerEmail = "juanito01@gmail.com";
    //this.inputParams.reservationNumber = "SSXX234XLJJKJLL";
  }

  goBack() {
    this.inputParams.goBack();
  }
}