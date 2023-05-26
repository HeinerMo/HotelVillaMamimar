import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICustomerDetail, ReservationPageComponent } from '../reservation-page.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ResevationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/Reservation';
import { Room } from 'src/app/models/Room';
import { RoomService } from 'src/app/services/room.service';
import { MessageDataTransferObject } from 'src/app/models/DataTransferObjects/MessageDTO';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() inputParams!: ICustomerDetail;

  room?: Room;

  constructor(private reservationPageComponent: ReservationPageComponent, private reservationService: ResevationService, private roomService: RoomService) { 
    //this.roomService.getAvailableRooms(this.inputParams.startDate, this.inputParams.endDate, this.inputParams.idRoomType)
    this.roomService.getAvailableRooms("2023/12/12", "2023/12/12", 1).subscribe((data: any) => {
      if (data.id == 1) {
        console.log(this.room)
      } else {
        this.reservationPageComponent!.setView(1);
      }
    })
  }

  ngOnInit() {

  }

  cancel() {
    this.reservationPageComponent!.setView(1);
  }


  //!IMPORTANT Data format should used '-' instead of '/'
  applyReservation(userform: NgForm) {
    if (userform.valid) {
      //this.reservationService.createReservation(new Reservation({ 'startingDate': this.inputParams.startDate!, 'endingDate': this.inputParams.endDate!, 'room': this.room!, })).subscribe((message: MessageDataTransferObject) => {
        this.reservationService.createReservation(new Reservation({ 'startingDate': "2023-12-13", 'endingDate': "2023-12-13", 'room': this.room!, })).subscribe((message: MessageDataTransferObject) => {
        if (message.id == 1) {
          this.inputParams.nextView(true, userform.controls['name'].value, userform.controls['last-name'].value, userform.controls['credit-card'].value);
        } else {
          this.inputParams.nextView(false)
        }
      })
    }
  }

}