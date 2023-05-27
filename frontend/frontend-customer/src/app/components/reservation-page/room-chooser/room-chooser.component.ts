import { Component, Input, OnInit } from '@angular/core';
import { ICustomerDetail, IRoomChooser } from '../reservation-page.component';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { RoomType } from 'src/app/models/RoomType';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-room-chooser',
  templateUrl: './room-chooser.component.html',
  styleUrls: ['./room-chooser.component.css'],
  providers: [DatePipe]
})
export class RoomChooserComponent implements OnInit {
  @Input() inputParams!: IRoomChooser;
  roomTypes: RoomType[] = [];
  startDate!: string;
  endDate!: string;
  roomType!: number;
  defaultRoomType: string;






  constructor(private roomTypeService: RoomTypeService, private miDatePipe: DatePipe) {
    const currentDate = new Date();
    this.startDate = this.miDatePipe.transform(currentDate, 'yyyy-MM-dd') ?? ''; // Establece la fecha actual como valor predeterminado
    this.endDate = this.miDatePipe.transform(currentDate, 'yyyy-MM-dd') ?? ''; // Establece la fecha actual como valor predeterminado
    this.defaultRoomType = '1';
  }


  ngOnInit() {
    this.initRoomTypes();
    //this is an example
    //this.inputParams.nextView('xx/xx/xxxx', 'xx/xx/xxxx', -1);
  }


  initRoomTypes() {
    this.roomTypeService.getRoomTypes().subscribe((data: any) => {
      let responseId: number = data.id


      if (responseId == 1) {
        let item: [] = data.item


        let name: any;
        let id: any;




        item.forEach((a: any) => {
          let objeto = Object.entries(a);


          name = objeto[2][1];
          id = objeto[0][1]


          this.createRoomTypes(new RoomType({ name: name, id: id }))


        });


      }


    });
  }


  createRoomTypes(roomType: RoomType) {
    this.roomTypes.push(roomType);
  }


  sendInformation() {
    if (this.roomType > 0) {
      this.startDate = this.miDatePipe.transform(this.startDate, 'yyyy/MM/dd') ?? '';
      this.endDate = this.miDatePipe.transform(this.endDate, 'yyyy/MM/dd') ?? '';
      this.inputParams.nextView(this.startDate, this.endDate, this.roomType);
    }
  }


}
