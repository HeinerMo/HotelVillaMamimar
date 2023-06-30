import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from 'src/app/models/Room';
import { RoomService } from 'src/app/services/room.service';
import { MatPaginator } from '@angular/material/paginator';


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import autoTable,{ UserOptions } from 'jspdf-autotable';
import 'jspdf-autotable'

interface JsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

interface IRoomStatus {
  number: number;
  type: string;
  state: string;
}

@Component({
  selector: 'app-hotel-status',
  templateUrl: './hotel-status.component.html',
  styleUrls: ['./hotel-status.component.css']
})

export class HotelStatusComponent implements AfterViewInit {
  rooms: Room[] = [];
  today: Date = new Date();
  displayedColumns = ['Número', 'Tipo', 'Estado'];
  dataSource = new MatTableDataSource<Room>(this.rooms);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roomService: RoomService) { }
  
  ngAfterViewInit(): void {
    this.getRoomStatus();
  }

  getRoomStatus(): void {
    this.roomService.getRoomsStatus().subscribe((data: any) => {
      let responseId: number = data.id

      if (responseId == 1) {
        let item: [] = data.item

        item.forEach((room: any) => {
          let id = room.id;
          let type = room.roomType;
          let status = room.reservationStatus;

          Object.keys(type).forEach(key => {
            if (key === "name") {
              const name = type[key];
              type = name;
            }
          });

          this.createRoom(new Room({ id: id, roomType: type, roomStatus: status }))
        });
      }
      this.dataSource = new MatTableDataSource<Room>(this.rooms)
      this.dataSource.paginator = this.paginator;
    });
  
  }

  public convertToPDF(){
    
    // Create a new jsPDF instance with 'portrait' orientation, 'px' units, and 'a4' paper size
    const doc = new jsPDF('portrait', 'px', 'a4') as JsPDFWithPlugin;

    // Convert the rooms data to tableData format
    const tableData: any[] = this.rooms.map((room: Room) => [
      room.id,          // 'Número' column data
      room.roomType,    // 'Tipo' column data
      room.roomStatus   // 'Estado' column data
    ]);

    console.log(tableData)
    // Add the table to the PDF document using jspdf-autotable
    doc.autoTable({
      head: [['Número', 'Tipo', 'Estado']], // Table headers
      body: tableData, // Table data
    });

    const text = 'Estado de las habitaciones';
    const fontSize = 12; // Set your desired font size here
    doc.setFontSize(fontSize);

    const textWidth = doc.getStringUnitWidth(text) * fontSize;
    const pdfWidth = doc.internal.pageSize.getWidth();

    // Calculate the x-coordinate to center the text
    const centerX = (pdfWidth - textWidth) / 2;

    // Add the text at the calculated center position
    doc.text(text, centerX, 20);

    doc.save('estadoHabitacion.pdf');
      
  }


  createRoom(ad: Room) {
    this.rooms.push(ad);
  }
}
