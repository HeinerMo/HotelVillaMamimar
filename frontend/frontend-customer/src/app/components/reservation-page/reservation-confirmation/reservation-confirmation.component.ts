import { Component, Input, OnInit } from '@angular/core';
import { IConfimation } from '../reservation-page.component';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent implements OnInit {
  
  @Input() inputParams!: IConfimation;

  constructor() {}

  ngOnInit() {
    console.log(this.inputParams)
    if (this.inputParams != undefined) {
      //console.log(this.inputParams.reservationParams['toFirstStepTest'])
    }
  }
}