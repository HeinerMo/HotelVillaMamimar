import {Component, Inject, OnInit} from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { FormControl, Validators } from '@angular/forms';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { RoomService } from 'src/app/services/room.service';

const today = new Date();
const day = today.getDay()
const month = today.getMonth();
const year = today.getFullYear();

interface IRoomType {
  id: number,
  name: String
}

@Component({
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class RoomAvailabilityComponent implements OnInit{
  //Dates Forms Control
  beginingDateControl: FormControl = new FormControl();
  endingDateControl: FormControl = new FormControl();
  
  // Room Type Form Control
  roomTypeControl = new FormControl<IRoomType | null>(null, Validators.required);
  roomTypes: IRoomType[] = [];

  // Min dates
  minDateForBegining = new Date();
  minDateForEnding = this.minDateForBegining;

  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private roomTypeService: RoomTypeService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.beginingDateControl.setValidators([Validators.required]);
    this.endingDateControl.setValidators([Validators.required]);

    this.roomTypeService.getRoomTypes().subscribe(data => {
      if (data.id == 1 && data.item != undefined) {
        data.item.forEach(roomType => {
          var id: number = roomType.id!;
          var name: String = roomType.name!;
          var roomTypeAux: IRoomType = {
            id: id,
            name: name
          }
          this.roomTypes.push(roomTypeAux)
        })
      }
    })
  }

  getDateFormatString(): string {
    if (this._locale === 'es-ES') {
      return 'DD/MM/YYYY';
    } else {
      return 'DD/MM/YYYY';
    }
  }

  setBeginingDateValue(date: any) {
    this.minDateForEnding = new Date(date);
  }

  sendRequest() {
    if (this.beginingDateControl.valid && this.endingDateControl.valid && this.roomTypeControl.valid) {
      let startingDate = `${this.beginingDateControl.value._i.year}-${this.beginingDateControl.value._i.month+1}-${this.beginingDateControl.value._i.date}`;
      let endingDate = `${this.endingDateControl.value._i.year}-${this.endingDateControl.value._i.month+1}-${this.endingDateControl.value._i.date}`;
      let roomTypeId = this.roomTypeControl.value!.id;

      this.roomService.getAvailableRoomsToAdmin(startingDate, endingDate, roomTypeId).subscribe(data => {
        console.log(data)
      });
    } else {
      this.beginingDateControl.markAsTouched();
      this.endingDateControl.markAsTouched();
      this.roomTypeControl.markAsTouched();
    }
  }

}