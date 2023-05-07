import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {

  public params: {reservationParams: {}, step:number} = {
    reservationParams: {},
    step: 0
  };

  constructor() {}
  
  ngOnInit(): void {
    let reservationParams = {
      toFirstStepTest: "This is a test"
    };
    this.navigateToRoomChooser(reservationParams);
  }

  navigateToRoomChooser(outputParams: {} = {}) {
    this.params.reservationParams = outputParams;
    // Change this step value according to your view: View one = 1, View two = 2, View three = 3
    this.params.step = 1;
  }
}
