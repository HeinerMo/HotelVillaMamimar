import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICustomerDetail, ReservationPageComponent } from '../reservation-page.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ResevationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/models/Reservation';
import { Room } from 'src/app/models/Room';
import { RoomService } from 'src/app/services/room.service';
import { MessageDataTransferObject } from 'src/app/models/DataTransferObjects/MessageDTO';
import { ResponseDTO } from 'src/app/models/DataTransferObjects/ResponseDTO';
import { RoomType } from 'src/app/models/RoomType';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { toByteArray } from 'base64-js';
import { DomSanitizer } from '@angular/platform-browser';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
  @Input() inputParams!: ICustomerDetail;

  room: Room;
  roomType: RoomType;

  constructor(private reservationPageComponent: ReservationPageComponent,
    private reservationService: ResevationService,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private sanitizer: DomSanitizer) {

    this.roomType = new RoomType({})
    this.room = new Room({})
    
  }

  ngOnInit() {
    this.inputParams.idRoomType = 1
    this.inputParams.startDate = "2023/12/12"
    this.inputParams.endDate = "2023/12/12"
    this.roomTypeService.getRoomTypes().subscribe((response: ResponseDTO<RoomType[]>) => {

      if (response.id == 1) {
        
        let name: any;
        let description: any;
        let price: any;
        let image: any;

        response.item!.forEach((type: any) => {
          if (type.id == this.inputParams.idRoomType) {
            
            let typeJSON = Object.entries(type);

            name = typeJSON[2][1];
            price = typeJSON[1][1];
            description = typeJSON[3][1];
            image =  type.roomTypeImages[0].image.imageData;
            let decodedBytes: Uint8Array;
            decodedBytes = toByteArray(image);
            const blob = new Blob([decodedBytes], { type: 'image/jpg' });
            let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            this.roomType.description = description
            this.roomType.name = name
            this.roomType.price = price
            this.roomType.image = url
          }
        });
      }
    });

    this.roomService.getAvailableRooms("2023/12/12", "2023/12/12", 1).subscribe((data: ResponseDTO<Room[]>) => {
      if (data.id == 1) {
        this.room = data.item![0]
      } else {
        this.inputParams.nextView(false)
      }
    })


  }

  cancel() {
    this.reservationPageComponent!.setView(1);
  }


  //!IMPORTANT Data format should used '-' instead of '/'
  applyReservation(userform: NgForm) {
    if (userform.valid) {
      /*this.reservationService.createReservation(new Reservation({
        'startingDate': "2023/12/12",
        'endingDate': "2023/12/12",
        'room': this.room!,
        'customer': new Customer({
          'name': userform.controls['name'].value,
          'lastname': userform.controls['last-name'].value,
          'creditCardNumber': userform.controls['credit-card'].value,
          'email': userform.controls['email'].value,
          'id_number': userform.controls['id_number'].value
        })
      })).subscribe((message: MessageDataTransferObject) => {
        if (message.id == 1) {
          console.log(message.message)
          this.inputParams.nextView(true, userform.controls['name'].value, userform.controls['last-name'].value, userform.controls['email'].value);
        } else {
          console.log(message.message)
        }
      })*/
      this.inputParams.nextView(true, userform.controls['name'].value, userform.controls['last-name'].value, userform.controls['email'].value);
    }
  }
}