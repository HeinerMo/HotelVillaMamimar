import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent implements OnInit, OnChanges {
  @Input() inputParams: {reservationParams: {}} | undefined;

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    let inputParamsAux = changes['inputParams'].currentValue;
    if (inputParamsAux != undefined) {
      //Change this if inputParams change on after init
    }
  }

  ngOnInit() {
    console.log(this.inputParams)
  }
}