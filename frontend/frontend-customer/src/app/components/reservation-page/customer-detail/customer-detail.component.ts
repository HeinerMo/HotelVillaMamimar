import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit, OnChanges {
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
    //  secondViewTest: 'A very very long image enconded..................'
    // }
    // this.navigateToConfirmation(outputParams);
  }

  navigateToConfirmation(outputParams:{}) {
    if (this.inputParams != undefined) {
      this.inputParams.reservationParams = outputParams;
      this.inputParams.step = 3;
    };
  }
}