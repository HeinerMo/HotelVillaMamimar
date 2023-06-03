import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from 'src/app/models/Room';
import { RoomService } from 'src/app/services/room.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-hotel-status',
  templateUrl: './hotel-status.component.html',
  styleUrls: ['./hotel-status.component.css']
})

export class HotelStatusComponent implements OnInit {
  rooms: Room[] = [];
  today: Date = new Date();
  displayedColumns = ['Número', 'Tipo', 'Estado'];
  dataSource = new MatTableDataSource<Room>()
  pageSize = 5; // Cantidad de elementos por página
  currentPage = 0; // Número de página actual

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRoomStatus();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // Lógica adicional para obtener los datos correspondientes a la página actual
    // y actualizar el dataSource si es necesario.
  }

  getRoomStatus(): void {
    this.roomService.getRoomsStatus().subscribe((data: any) => {
      let responseId: number = data.id

      if (responseId == 1) {
        let item: [] = data.item

        let id: any;
        let type: any;
        let status: any;

        item.forEach((a: any) => {
          let objeto = Object.entries(a);
          id = objeto[0][1];
          type = objeto[5][1];
          status = objeto[3][1];

          Object.keys(type).forEach(key => {
            if (key === "name") {
              const name = type[key];
              type = name;
            }
          });



          this.createRoom(new Room({ id: id, roomType: type, roomStatus: status }))
        });
      }

    });
    this.dataSource = new MatTableDataSource<Room>(this.rooms)
    this.dataSource.paginator = this.paginator;
  }

  createRoom(ad: Room) {
    this.rooms.push(ad);
  }
}
