import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-room-chooser',
  templateUrl: './room-chooser.component.html',
  styleUrls: ['./room-chooser.component.css']
})
export class RoomChooserComponent implements OnInit, OnChanges {
  @Input() inputParams: {reservationParams: {}, step:number} | undefined;

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    let inputParamsAux = changes['inputParams'].currentValue;
    if (inputParamsAux != undefined) {
      //Change this if inputParams change on after init
    }
  }

  ngOnInit() {
    console.log(this.inputParams)

    // This is an example code
    // let outputParams: {} = {
    //  firstViewTest: 'This is room data..................'
    // }
    // this.navigateToCustomerDetail(outputParams);
  }

  navigateToCustomerDetail(outputParams:{}) {
    if (this.inputParams != undefined) {
      this.inputParams.reservationParams = outputParams;
      this.inputParams.step = 2
    };
  }
}
