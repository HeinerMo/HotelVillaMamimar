import { Component, OnInit } from '@angular/core';

export interface IConfirmation {
  goBack(): void,
  isSuccess:boolean,
  customerFullName:string,
  reservationNumber:string,
  customerEmail:string
}
export interface IRoomChooser {
  nextView(startDate: string, endDate: string, idRoomType: number): void
}
export interface ICustomerDetail {
  nextView(isSuccess:boolean, customerFullName?:string, reservationNumber?:string, customerEmail?:string): void,
  startDate: string,
  endDate: string,
  idRoomType: number
}
@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {

  public viewIndex = -1;

  public roomChooserParams: IRoomChooser = {
    nextView: (startDate: string, endDate: string, idRoomType: number) => {
      this.customerDetailsParams.startDate = startDate;
      this.customerDetailsParams.endDate = endDate;
      this.customerDetailsParams.idRoomType = idRoomType;
      this.setView(2);
    }
  }

  public customerDetailsParams: ICustomerDetail = {
    nextView: (isSuccess:boolean, customerFullName:string = '', reservationNumber:string = '', customerEmail:string = '') => {
      this.confirmationParams.isSuccess = isSuccess;
      this.confirmationParams.customerFullName = customerFullName;
      this.confirmationParams.reservationNumber = reservationNumber;
      this.confirmationParams.customerEmail = customerEmail;
      this.setView(3);
    },
    startDate: '',
    endDate: '',
    idRoomType: -1
  }

  public confirmationParams: IConfirmation = {
    isSuccess: false,
    customerFullName: '',
    reservationNumber: '',
    customerEmail: '',
    goBack: () => {
      this.setView(1);
    }
  }

  constructor() {}
  
  ngOnInit(): void {
    // Change this value according to your view: View one = 1, View two = 2, View three = 3
    this.setView(2)
  }

  setView(index:number) {
    this.viewIndex = index;
  }
}
