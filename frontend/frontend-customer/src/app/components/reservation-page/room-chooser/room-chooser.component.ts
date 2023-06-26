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
  startDate!: Date;
  endDate!: Date;
  minStartDate!: Date;
  roomType!: number;
  defaultRoomType: string;

  constructor(private roomTypeService: RoomTypeService, private miDatePipe: DatePipe) {
    const currentDate = new Date();
    this.minStartDate = currentDate;
    this.startDate = this.minStartDate;
    this.endDate = this.minStartDate;
    this.defaultRoomType = '1';
  }

  getMinStartDate() {
    const currentDate = new Date();
    return this.miDatePipe.transform(`${currentDate.getFullYear()} ${currentDate.getMonth() + 1} ${currentDate.getDate() + 1}`, 'yyyy-MM-dd') ?? '';
  }

  getMinEndDate() {

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
      let startDateString = this.miDatePipe.transform(this.startDate, 'yyyy/MM/dd') ?? '';
      let endDateString = this.miDatePipe.transform(this.endDate, 'yyyy/MM/dd') ?? '';
      this.inputParams.nextView(startDateString, endDateString, this.roomType);
    }
  }


}
