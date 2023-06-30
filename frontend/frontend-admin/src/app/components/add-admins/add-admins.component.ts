import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { toByteArray } from 'base64-js';
import { HotelService } from 'src/app/services/hotel.service';
import { CreateAdminComponent } from './dialogs/create-admin/create-admin.component';
import { AdminService } from 'src/app/services/admin.service';

export interface IAdmin {
  id: number;
  userName: string;
  password: string;
}

@Component({
  selector: 'app-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.css']
})
export class AddAdminsComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['id', 'userName','actions'];
  admins: IAdmin[] = [];
  dataSource: MatTableDataSource<IAdmin>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplayWithExpand: string[];

  constructor(
    public adminService: AdminService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
  ) {
    this.dataSource = new MatTableDataSource<IAdmin>(this.admins);
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAdmins();  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator) {
      this.paginator._intl.nextPageLabel = 'Siguiente';
      this.paginator._intl.previousPageLabel = 'Anterior';
      this.paginator._intl.itemsPerPageLabel = 'Cantidad por página:';
    }
  }

  getAdmins() {
    this.adminService.getAdmins().subscribe((data) => {
      if (data.id === 1) {
        this.reloadTable(data.item);
      }
    });
  }

  reloadTable(admins: IAdmin[]) {
    this.admins = admins;
    this.dataSource.data = this.admins;
  }

  public openCreateAdminDialog() {
    const dialogRef = this.dialogService.open(CreateAdminComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {

        let admin = result.admin;

        let adminFormatted = {
          userName: admin.userName,
          password: admin.password,
        }

        this.adminService.CreateAdmin(adminFormatted).subscribe(data => {
          if (data.id == 1) {
            this.getAdmins();
            this._snackBar.open('Administrador creado', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }
}
