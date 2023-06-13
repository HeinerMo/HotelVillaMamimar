import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateDiscountComponent } from './dialogs/create-discount/create-discount.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModifyDiscountComponent } from './dialogs/modify-discount/modify-discount.component';
import * as moment from 'moment';
import { DeleteDiscountComponent } from './dialogs/delete-discount/delete-discount.component';
import { DiscountService } from 'src/app/services/discount.service';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { RoomType } from 'src/app/models/RoomType';

export interface IDiscount {
  id: number;
  startingDate: Date;
  endingDate: Date;
  name: string;
  description: string;
  roomTypeId: number;
  porcentage: number;
  roomType?: RoomType
}

export interface IRoomType {
  id: number;
  price: number;
  name: string;
  description: string;
  discount: number;
  finalPrice: number;
}

@Component({
  selector: 'app-manage-discounts',
  templateUrl: './manage-discounts.component.html',
  styleUrls: ['./manage-discounts.component.css']
})
export class ManageDiscountsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'percentage', 'starting-date', 'ending-date', 'room-type-id', 'actions'];
  discounts: IDiscount[] = []
  dataSource: MatTableDataSource<IDiscount> = new MatTableDataSource<IDiscount>(this.discounts);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public discountServive: DiscountService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar,
    public roomTypeService: RoomTypeService
  ) { }

  ngAfterViewInit() {
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.itemsPerPageLabel = "Cantidad de despuestos por página:";
    this.getAllDiscounts();
  }

  getAllDiscounts() {
    this.discountServive.getAllDiscounts().subscribe(data => {
      if (data.id == 1) {
        data.item.forEach((discount: IDiscount) => {
          let startingDate = new Date(discount.startingDate);
          let endingDate = new Date(discount.endingDate)
          discount.startingDate = startingDate;
          discount.endingDate = endingDate;
        });
        this.reloadTable(data.item)
      }
    })
  }

  openCreateDialog() {
    const dialogRef = this.dialogService.open(CreateDiscountComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let discount = result.discount;

        let startingDate = `${discount.startingDate._i.year}-${discount.startingDate.format("MM")}-${discount.startingDate._i.date}`;
        let endingDate = `${discount.endingDate._i.year}-${discount.endingDate.format("MM")}-${discount.endingDate._i.date}`;

        let discountFormatted = {
          name: discount.name,
          porcentage: (Number)(discount.porcentage),
          startingDate: startingDate,
          endingDate: endingDate,
          description: discount.description,
          roomTypeId: discount.roomTypeId,
          roomType: null
        }

        this.discountServive.createDiscount(discountFormatted).subscribe(data => {
          if (data.id == 1) {
            data.item.forEach((discount: IDiscount) => {
              let startingDate = new Date(discount.startingDate);
              let endingDate = new Date(discount.endingDate)
              discount.startingDate = startingDate;
              discount.endingDate = endingDate;
            });
            this.reloadTable(data.item)
            this._snackBar.open('Descuento creado', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }

  openModifyDialog(discount: IDiscount) {
    let newDiscount: IDiscount = {
      id: discount.id,
      name: discount.name,
      porcentage: discount.porcentage,
      startingDate: discount.startingDate,
      endingDate: discount.endingDate,
      description: discount.description,
      roomTypeId: discount.roomTypeId,
      roomType: discount.roomType
    }

    const dialogRef = this.dialogService.open(ModifyDiscountComponent, {
      data: newDiscount
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let discount = result.discount;
        discount.startingDate = moment(new Date(discount.startingDate));
        discount.endingDate = moment(new Date(discount.endingDate));

        let startingDate = `${discount.startingDate.format("YYYY")}-${discount.startingDate.format("MM")}-${discount.startingDate.format("DD")}`;
        let endingDate = `${discount.endingDate.format("YYYY")}-${discount.endingDate.format("MM")}-${discount.endingDate.format("DD")}`;

        let discountFormatted = {
          id: discount.id,
          name: discount.name,
          porcentage: (Number)(discount.porcentage),
          startingDate: startingDate,
          endingDate: endingDate,
          description: discount.description,
          roomTypeId: discount.roomTypeId,
          roomType: null
        }

        this.discountServive.modifyDiscount(discountFormatted).subscribe(data => {
          if (data.id == 1) {
            this._snackBar.open('Descuento modificado', 'Cerrar', {
              duration: 3000
            });
            this.getAllDiscounts();
          }
        })
      }
    });
  }

  openDeleteDialog(discount: IDiscount) {
    let newDiscount: IDiscount = {
      id: discount.id,
      name: discount.name,
      porcentage: discount.porcentage,
      startingDate: discount.startingDate,
      endingDate: discount.endingDate,
      description: discount.description,
      roomTypeId: discount.roomTypeId,
      roomType: discount.roomType
    }

    const dialogRef = this.dialogService.open(DeleteDiscountComponent, {
      data: newDiscount
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let discount = result.discount;
        discount.startingDate = moment(new Date(discount.startingDate));
        discount.endingDate = moment(new Date(discount.endingDate));

        let startingDate = `${discount.startingDate.format("YYYY")}-${discount.startingDate.format("MM")}-${discount.startingDate.format("DD")}`;
        let endingDate = `${discount.endingDate.format("YYYY")}-${discount.endingDate.format("MM")}-${discount.endingDate.format("DD")}`;

        let discountFormatted = {
          id: discount.id,
          name: discount.name,
          porcentage: (Number)(discount.porcentage),
          startingDate: startingDate,
          endingDate: endingDate,
          description: discount.description,
          roomTypeId: discount.roomTypeId,
          roomType: null
        }

        this.discountServive.deleteDiscount(discountFormatted).subscribe(data => {
          if (data.id == 1) {
            data.item.forEach((discount: IDiscount) => {
              let startingDate = new Date(discount.startingDate);
              let endingDate = new Date(discount.endingDate)
              discount.startingDate = startingDate;
              discount.endingDate = endingDate;
            });
            this.reloadTable(data.item)
            this._snackBar.open('Descuento eliminado', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }

  reloadTable(discounts: IDiscount[]) {
    this.discounts = discounts;
    this.dataSource = new MatTableDataSource<IDiscount>(this.discounts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFormattedDate(date: Date): string {
    date = new Date(date)
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
