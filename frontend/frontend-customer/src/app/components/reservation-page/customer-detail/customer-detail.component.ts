import { Component, Input, OnInit } from '@angular/core';
import { ICustomerDetail, ReservationPageComponent } from '../reservation-page.component';
import { NgForm } from '@angular/forms';
import { ResevationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/Reservation';
import { Room } from 'src/app/models/Room';
import { RoomService } from 'src/app/services/room.service';
import { MessageDataTransferObject } from 'src/app/models/DataTransferObjects/MessageDTO';
import { ResponseDTO } from 'src/app/models/DataTransferObjects/ResponseDTO';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { toByteArray } from 'base64-js';
import { DomSanitizer } from '@angular/platform-browser';
import { Customer } from 'src/app/models/Customer';

export interface IRoomType {
  id?: number;
  price: number;
  name: string;
  description: string;
  hexImage?: string;
  isDeleted: boolean;
  roomTypeImages?: any
}

interface IReservation {
  id?: number,
  startingDate: string,
  endingDate: string,
  roomId: number,
  customerId?: number,
  customer?: any
}

interface ICustomer {
  id?: number,
  name: string,
  lastName: string,
  email: string,
  id_number: string,
  creditCardNumber: string
}

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() inputParams!: ICustomerDetail;

  room: Room;
  roomType?: IRoomType;

  constructor(private reservationPageComponent: ReservationPageComponent,
    private reservationService: ResevationService,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private sanitizer: DomSanitizer) {

    this.room = new Room({})
  }

  ngOnInit() {

    // DATES FORMAT MUST BE "YYYY-MM-DD"

    // FIXME: REMOVE THIS PARAMS
    //this.inputParams.endDate = "2023/06/29";
    //this.inputParams.idRoomType = 3;
    //this.inputParams.startDate = "2023/06/26";

    this.roomTypeService.getAllRoomTypes().subscribe((response: ResponseDTO<any>) => {

      if (response.id == 1) {

        response.item!.forEach((roomType: any) => {
          if (roomType.id == this.inputParams.idRoomType) {

            this.roomType = {
              id: roomType.id,
              name: (String)(roomType.name!),
              price: roomType.finalPrice!,
              description: (String)(roomType.description!),
              isDeleted: false,
              roomTypeImages: roomType.roomTypeImages
            }

            this.roomTypeService.getRoomTypeFinalPrice(roomType!.id).subscribe(data => {
              this.inputParams.startDate = this.inputParams.startDate.replaceAll("/", "-");
              this.inputParams.endDate = this.inputParams.endDate.replaceAll("/", "-")

              let countDays = this.calcDays(this.inputParams.startDate, this.inputParams.endDate);
              let totalDays = countDays > 0 ? countDays : 1;
              
              if (data.id == 1) {
                this.roomType!.price = data.item * (totalDays);
              } else {
                this.roomType!.price = roomType!.price * (totalDays);
              }
            });
          }
        });
      }
    });

    this.roomService.getAvailableRoomsToAdmin(this.inputParams.startDate, this.inputParams.endDate, this.inputParams.idRoomType).subscribe((data: ResponseDTO<Room[]>) => {
      if (data.id == 1) {
        this.room = data.item![0]
      } else {
        this.inputParams.nextView(false)
      }
    })
  }

  calcDays(startingDateStr: string, endingDateStr: string): number {
    const startingDate = new Date(startingDateStr);
    const endingDate = new Date(endingDateStr);
  
    const diffInMilliseconds = endingDate.getTime() - startingDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    return diffInDays;
  }
  
  getImageFromBytes(roomTypesImages: any[]) {
    if (roomTypesImages != undefined && roomTypesImages.length > 0) {
      let imageEncoded = roomTypesImages[0].image.imageData;

      let decodedBytes: Uint8Array;
      const byteArray = new Uint8Array([]);

      decodedBytes = toByteArray(imageEncoded);
      const blob = new Blob([decodedBytes], { type: 'image/png' });
      let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));

      return url;
    }

    return "";
  }

  cancel() {
    this.reservationPageComponent!.setView(1);
  }

  //!IMPORTANT Data format should used '-' instead of '/'
  applyReservation(userform: NgForm) {
    if (userform.valid) {

      let customer: ICustomer = {
        name: userform.controls['name'].value,
        lastName: userform.controls['last-name'].value,
        email: userform.controls['email'].value,
        id_number: userform.controls['id_number'].value,
        creditCardNumber: userform.controls['credit-card'].value
      }

      let reservation: IReservation = {
        startingDate: this.inputParams.startDate,
        endingDate: this.inputParams.endDate,
        roomId: this.room.id!,
        customer: customer
      }
      
      this.reservationService.createReservation(reservation).subscribe(data => {
        if (data.id == 1) {
          this.inputParams.nextView(true, `${customer.name} ${customer.lastName}`, `R${data.item.id}${data.item.customer.id}`, customer.email);
        } else {
          console.log(data.message)
          this.inputParams.nextView(false);
        }
      })
    }
  }
}