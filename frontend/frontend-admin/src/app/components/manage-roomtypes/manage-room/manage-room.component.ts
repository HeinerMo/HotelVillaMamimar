import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ModifyRoomComponent } from './dialogs/modify-room/modify-room.component';
import { RoomService } from 'src/app/services/room.service';
import { RoomType } from 'src/app/models/RoomType';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { Observable, map } from 'rxjs';

export interface IRoomType {
  id: number;
  price: number;
  name: string;
  description: string;
  discount: number;
  finalPrice: number;
}

export interface IRoom {
  id?: number;
  roomTypeId: number;
  active: boolean;
  reservationStatus?: string;
  roomType?: RoomType
}

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.css'],
})
export class ManageRoomComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'roomType', 'active', 'actions'];
  rooms: IRoom[] = [];
  dataSourceRoom: MatTableDataSource<IRoom>;

  @ViewChild(MatPaginator) paginator_room!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplayWithExpand: string[];

  constructor(
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    public roomService: RoomService
  ) {
    this.dataSourceRoom = new MatTableDataSource<IRoom>(this.rooms);
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  }

  ngOnInit() {
    this.dataSourceRoom.paginator = this.paginator_room;
    this.dataSourceRoom.sort = this.sort;

    this.getAllRooms();
  }

  ngAfterViewInit() {
    this.dataSourceRoom.paginator = this.paginator_room;
    this.dataSourceRoom.sort = this.sort;

    if (this.paginator_room) {
      this.paginator_room._intl.nextPageLabel = 'Siguiente';
      this.paginator_room._intl.previousPageLabel = 'Anterior';
      this.paginator_room._intl.itemsPerPageLabel = 'Cantidad de habitaciones por página:';
    }
  }

  getAllRooms() {
    this.roomService.getAllRooms().subscribe((data) => {
      if (data.id === 1) {
        this.reloadTable(data.item)
      }
    });
  }

  openModifyRoomDialog(room: any) {
    let newRoom: IRoom = {
      id: room.id,
      roomTypeId: room.roomTypeId,
      active: room.active
    }

    const dialogRef = this.dialogService.open(ModifyRoomComponent, {
      data: newRoom
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {

        let roomFormatted = {
          id: result.room.id,
          roomTypeId: result.room.roomTypeId,
          active: result.room.active
        }

        this.roomService.modifyRoom(roomFormatted).subscribe(data => {
          if (data.id == 1) {
            this._snackBar.open('Habitación modificada', 'Cerrar', {
              duration: 3000
            });
            this.getAllRooms();
          }
        })
        
      }
    });
  }

  reloadTable(room: IRoom[]) {
    this.rooms = room;
    this.dataSourceRoom.data = this.rooms;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRoom.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceRoom.paginator) {
      this.dataSourceRoom.paginator.firstPage();
    }
  }
}
