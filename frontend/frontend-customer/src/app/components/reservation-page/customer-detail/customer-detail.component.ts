import { Component, Input, OnInit } from '@angular/core';
import { ICustomerDetail } from '../reservation-page.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() inputParams!: ICustomerDetail;

  constructor() {}

  ngOnInit() {
    console.log(this.inputParams)

    //this is an example
    //this.inputParams.nextView(true, 'nombre completo', 'número de reservación', 'correo');
  }
}