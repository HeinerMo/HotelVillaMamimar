import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteRoomtypesComponent } from './dialogs/delete-roomtypes/delete-roomtypes.component';
import { MoreRoomtypesComponent } from './dialogs/more-roomtypes/more-roomtypes.component';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { toByteArray } from 'base64-js';
import { DomSanitizer } from '@angular/platform-browser';
import { CreateRoomtypeComponent } from './dialogs/create-roomtype/create-roomtype.component';
import { ModifyRoomtypeComponent } from './dialogs/modify-roomtype/modify-roomtype.component';

export interface IRoomType {
  id?: number;
  price: number;
  name: string;
  description: string;
  hexImage?: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-manage-roomtypes',
  templateUrl: './manage-roomtypes.component.html',
  styleUrls: ['./manage-roomtypes.component.css'],
})
export class ManageRoomtypesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'price', 'name', 'description', 'image', 'actions'];
  roomTypes: IRoomType[] = [];
  dataSource: MatTableDataSource<IRoomType>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplayWithExpand: string[];

  constructor(
    public roomTypeServive: RoomTypeService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
  ) {
    this.dataSource = new MatTableDataSource<IRoomType>(this.roomTypes);
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAllRoomTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator) {
      this.paginator._intl.nextPageLabel = 'Siguiente';
      this.paginator._intl.previousPageLabel = 'Anterior';
      this.paginator._intl.itemsPerPageLabel = 'Cantidad por página:';
    }
  }

  getAllRoomTypes() {
    this.roomTypeServive.getAllRoomTypes().subscribe((data) => {
      if (data.id === 1) {
        this.reloadTable(data.item);
      }
    });
  }

  getImageFromBytes(roomTypesImages: any[]) {
    if (roomTypesImages.length > 0) {
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

  openCreateRoomTypeDialog() {
    const dialogRef = this.dialogService.open(CreateRoomtypeComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {

        let roomType = result.roomType;

        let roomTypeFormatted = {
          name: roomType.name,
          description: roomType.description,
          price: roomType.price,
          isDeleted: false,
          hexImageString: roomType.hexImage
        }

        this.roomTypeServive.createRoomType(roomTypeFormatted).subscribe(data => {
          if (data.id == 1) {
            this.reloadTable(data.item)
            this._snackBar.open('Tipo de habitación creado', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }

  openModifyRoomTypeDialog(roomType: any) {
    let newRoomType: IRoomType = {
      id: roomType.id,
      name: roomType.name,
      price: roomType.price,
      description: roomType.description,
      isDeleted: roomType.isDeleted,
      hexImage: roomType.roomTypeImages[0].image.imageData
    }

    const dialogRef = this.dialogService.open(ModifyRoomtypeComponent, {
      data: newRoomType
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {

        let roomTypeFormatted = {
          id: result.roomType.id,
          name: result.roomType.name,
          description: result.roomType.description,
          price: result.roomType.price,
          isDeleted: result.roomType.isDeleted,
          hexImageString: result.roomType.hexImage
        }

        this.roomTypeServive.updateRoomType(roomTypeFormatted).subscribe(data => {
          if (data.id == 1) {
            this._snackBar.open('Tipo de habitación modificado', 'Cerrar', {
              duration: 3000
            });
            this.getAllRoomTypes();
          }
        })
        
      }
    });
  }

  openDeleteRoomTypeDialog(roomType: IRoomType) {
    const dialogRef = this.dialogService.open(DeleteRoomtypesComponent, {
      data: roomType,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && result.id === 1) {
        const roomTypeFormatted = {
          id: result.roomType.id,
          description: result.roomType.description,
          name: result.roomType.name,
          price: result.roomType.price,
          roomTypeImages: result.roomType.roomTypeImages
        };

        this.roomTypeServive.deleteRoomType(roomTypeFormatted).subscribe((data) => {
          if (data.id === 1) {
            this.reloadTable(data.item);
            this._snackBar.open('Tipo de habitación eliminido', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  openMoreRoomTypeDialog(roomType: IRoomType) {
    const dialogRef = this.dialogService.open(MoreRoomtypesComponent, {
      data: roomType,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && result.id === 1) {
      }
    });
  }

  reloadTable(roomTypes: IRoomType[]) {
    this.roomTypes = roomTypes;
    this.dataSource.data = this.roomTypes;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
