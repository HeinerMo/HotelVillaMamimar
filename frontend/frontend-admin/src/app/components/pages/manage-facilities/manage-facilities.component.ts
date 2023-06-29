import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { toByteArray } from 'base64-js';
import { HotelService } from 'src/app/services/hotel.service';
import { DeleteFacilityComponent } from './dialogs/delete-facility/delete-facility.component';
import { CreateFacilityComponent } from './dialogs/create-facility/create-facility.component';
import { ModifyFacilityComponent } from './dialogs/modify-facility/modify-facility.component';
export interface IFacililty {
  id?: number;
  description: string;
  hexImage?: string;
}

@Component({
  selector: 'app-manage-facilities',
  templateUrl: './manage-facilities.component.html',
  styleUrls: ['./manage-facilities.component.css']
})
export class ManageFacilitiesComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['id', 'description', 'image', 'actions'];
  facilities: IFacililty[] = [];
  dataSource: MatTableDataSource<IFacililty>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplayWithExpand: string[];

  constructor(
    public hotelService: HotelService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
  ) {
    this.dataSource = new MatTableDataSource<IFacililty>(this.facilities);
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getFacilities();  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator) {
      this.paginator._intl.nextPageLabel = 'Siguiente';
      this.paginator._intl.previousPageLabel = 'Anterior';
      this.paginator._intl.itemsPerPageLabel = 'Cantidad por página:';
    }
  }

  getFacilities() {
    this.hotelService.getFacilities().subscribe((data) => {
      if (data.id === 1) {
        this.reloadTable(data.item);
      }
    });
  }

  reloadTable(facilities: IFacililty[]) {
    this.facilities = facilities;
    this.dataSource.data = this.facilities;
  }

  getImageFromBytes(facilityImages: any[]) {
    if (facilityImages.length > 0 && facilityImages[0].image) {
      let imageEncoded = facilityImages[0].image.imageData;
  
      let decodedBytes: Uint8Array;
      const byteArray = new Uint8Array([]);
  
      decodedBytes = toByteArray(imageEncoded);
      const blob = new Blob([decodedBytes], { type: 'image/png' });
      let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  
      return url;
    }
  
    return "";
  }

  openDeleteFacilityDialog(facility: IFacililty) {
    const dialogRef = this.dialogService.open(DeleteFacilityComponent, {
      data: facility,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && result.id === 1) {
        const facilityFormatted = {
          id: result.facility.id,
          description: result.facility.description,
          facilityImages: result.facility.facilityImages
        };

        this.hotelService.deleteFacilty(facilityFormatted).subscribe((data) => {
          if (data.id === 1) {
            this.reloadTable(data.item);
            this._snackBar.open('Facilidad eliminida', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  public openCreateFacilityDialog() {
    const dialogRef = this.dialogService.open(CreateFacilityComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {

        let facility = result.facility;

        let facilityFormatted = {
          description: facility.description,
          hexImageString: facility.hexImage
        }

        this.hotelService.createFacility(facilityFormatted).subscribe(data => {
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

  openModifyFacilityDialog(facility: any) {
    let newFacility: IFacililty = {
      id: facility.id,
      description: facility.description,
      hexImage: facility.facilityImages[0].image.imageData
    }

    const dialogRef = this.dialogService.open(ModifyFacilityComponent, {
      data: newFacility
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        console.log(result);
        let facilityFormatted = {
          id: result.facility.id,
          description: result.facility.description,
          hexImageString: result.facility.hexImage
        }

        this.hotelService.updateFacility(facilityFormatted).subscribe(data => {
          if (data.id == 1) {
            this._snackBar.open('Tipo de habitación modificado', 'Cerrar', {
              duration: 3000
            });
            this.getFacilities();
          }
        })
        
      }
    });
  }


}
