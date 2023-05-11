import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICustomerDetail, ReservationPageComponent } from '../reservation-page.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() inputParams!: ICustomerDetail;

  constructor(private reservationPageComponent: ReservationPageComponent) {}

  ngOnInit() {
    console.log(this.inputParams)

    //this is an example
    //this.inputParams.nextView(true, 'nombre completo', 'número de reservación', 'correo');
  }

  cancel() {
    this.reservationPageComponent!.setView(1);
  }
}