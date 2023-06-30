import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { FormControl, Validators } from '@angular/forms';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { RoomService } from 'src/app/services/room.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import autoTable,{ UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable'

interface JsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

interface IRoomType {
  id: number,
  name: String
}

interface IAvailableRoom {
  roomNumber: number;
  roomTypeName: string;
  costTotal: number;
}

@Component({
  selector: 'app-room-availability',
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})



export class RoomAvailabilityComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  
  // Configure Table
  displayedColumns: string[] = ['roomNumber', 'roomTypeName', 'totalCost'];
  availableRooms: IAvailableRoom[] = []
  dataSource = new MatTableDataSource<IAvailableRoom>(this.availableRooms);

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
    private roomService: RoomService,
  ) { }

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

  calcDays(startingDateStr: string, endingDateStr: string): number {
    const startingDate = new Date(startingDateStr);
    const endingDate = new Date(endingDateStr);
  
    const diffInMilliseconds = endingDate.getTime() - startingDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  
    return diffInDays;
  }

  public convertToPDF(){
    
    const doc = new jsPDF('portrait', 'px', 'a4') as JsPDFWithPlugin;

    // Convert the availableRooms data to tableData format
    const tableData: any[] = this.availableRooms.map((room: IAvailableRoom) => [
      room.roomNumber,
      room.roomTypeName,
      room.costTotal
    ]);
  
    doc.autoTable({
      head: [['Número', 'Tipo', 'Costo total']], // Table headers
      body: tableData, // Table data
    });

    const text = 'Disponibilidad de Habitaciones';
    const fontSize = 12; // Set your desired font size here
    doc.setFontSize(fontSize);

    const textWidth = doc.getStringUnitWidth(text) * fontSize;
    const pdfWidth = doc.internal.pageSize.getWidth();

    // Calculate the x-coordinate to center the text
    const centerX = (pdfWidth - textWidth) / 2;

    // Add the text at the calculated center position
    doc.text(text, centerX, 20);
  
    doc.save('disponibilidadHabitacion.pdf'); // Save the generated PDF
      
  }


  

  sendRequest() {
    if (this.beginingDateControl.valid && this.endingDateControl.valid && this.roomTypeControl.valid) {
      let startingDate = `${this.beginingDateControl.value._i.year}-${this.beginingDateControl.value._i.month + 1}-${this.beginingDateControl.value._i.date}`;
      let endingDate = `${this.endingDateControl.value._i.year}-${this.endingDateControl.value._i.month + 1}-${this.endingDateControl.value._i.date}`;
      let roomTypeId = this.roomTypeControl.value!.id;

      this.roomService.getAvailableRoomsToAdmin(startingDate, endingDate, roomTypeId).subscribe(data => {
        if (data.id == 1 && data.item != undefined) {
          this.availableRooms = []

          data.item.forEach(room => {
            let availableRoom: IAvailableRoom = {
              roomNumber: room.id!,
              roomTypeName: room.roomType!.name,
              costTotal: 0
            }

            this.roomTypeService.getRoomTypeFinalPrice(room.roomType!.id).subscribe(data => {
              if (data.id == 1) {
                availableRoom.costTotal = data.item * this.calcDays(startingDate, endingDate);
              } else {
                availableRoom.costTotal = room.roomType!.price * this.calcDays(startingDate, endingDate); 
              }
            })

            this.availableRooms.push(availableRoom);
          })
        }

        this.dataSource = new MatTableDataSource<IAvailableRoom>(this.availableRooms);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.beginingDateControl.markAsTouched();
      this.endingDateControl.markAsTouched();
      this.roomTypeControl.markAsTouched();
    }
  }

}