import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICustomerDetail, ReservationPageComponent } from '../reservation-page.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() inputParams!: ICustomerDetail;

  constructor(private reservationPageComponent: ReservationPageComponent) { }

  ngOnInit() {
    console.log(this.inputParams)

    //this is an example
    //this.inputParams.nextView(true, 'nombre completo', 'número de reservación', 'correo');
  }

  cancel() {
    this.reservationPageComponent!.setView(1);
  }

  applyReservation(userform: NgForm) {
    console.log(userform.controls['name'].value, userform.controls['last-name'].value, userform.controls['credit-card'].value)
    if (userform.valid) {
      this.inputParams.nextView(true, userform.controls['name'].value, userform.controls['last-name'].value, userform.controls['credit-card'].value);
    }
  }

}