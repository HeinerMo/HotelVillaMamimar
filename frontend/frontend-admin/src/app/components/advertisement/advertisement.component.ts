import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { toByteArray } from 'base64-js';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { CreateAdvertisementComponent } from './dialogs/create-advertisement/create-advertisement.component';
import { DeleteAdvertisementComponent } from './dialogs/delete-advertisement/delete-advertisement.component';
import { ModifyAdvertisementComponent } from './dialogs/edit-advertisement/edit-advertisement.component';

export interface IAdvertisement {
  id: number;
  url: string;
  images: any;
  hexImage?: string;
}

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'url', 'image', 'actions'];
  // advertisement: Advertisement[] = [];
  advertisement: IAdvertisement[] = [];
  dataSource: MatTableDataSource<IAdvertisement> = new MatTableDataSource<IAdvertisement>(this.advertisement);

  @ViewChild(MatPaginator) paginatorAd!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public advertisementService: AdvertisementService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) { }

  ngAfterViewInit() {
    this.paginatorAd._intl.nextPageLabel = "Siguiente";
    this.paginatorAd._intl.previousPageLabel = "Anterior";
    this.paginatorAd._intl.itemsPerPageLabel = "Cantidad de anuncios por página:";
    this.getAllAdvertisement();
  }

  getImageFromBytes(adImages: any[]) {

    if (adImages.length > 0) {
      let imageEncoded = adImages[0].image.imageData;

      let decodedBytes: Uint8Array;
      const byteArray = new Uint8Array([]);

      decodedBytes = toByteArray(imageEncoded);
      const blob = new Blob([decodedBytes], { type: 'image/png' });
      let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));

      return url;
    }

    return "";
  }

  getAllAdvertisement() {
    this.advertisementService.getAdvertisement().subscribe((data: any) => {

      if (data.id == 1) {
        this.advertisement = [];
        let item: [] = data.item;
        let link: any;
        let images: any;
        let id: any;
        item.forEach((ad: any) => {
          id = ad.id;
          link = ad.url;
          images = ad.advertisementImages;

          const advertisement: IAdvertisement = {
            id: id,
            url: link,
            images: images,
            hexImage: images[0].image.imageData
          }
          this.createAdvertise(advertisement)
        });
        this.reloadTable(this.advertisement)
      }
    })
  }

  createAdvertise(ad: IAdvertisement) {
    this.advertisement.push(ad);
  }

  openCreateDialog() {
    const dialogRef = this.dialogService.open(CreateAdvertisementComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let ad = result.ad;

        let adFormatted = {
          url: ad.url,
          hexImageString: ad.hexImage
        }

        this.advertisementService.createAdvertisement(adFormatted).subscribe(data => {
          if (data.id == 1) {
            this.getAllAdvertisement();
            this._snackBar.open('Publicidad creada', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }

  openModifyDialog(advertisement: IAdvertisement) {
    let newAdvertisement: IAdvertisement = {
      id: advertisement.id,
      url: advertisement.url,
      images: advertisement.images,
      hexImage: advertisement.hexImage
    }

    const dialogRef = this.dialogService.open(ModifyAdvertisementComponent, {
      data: newAdvertisement
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let advertisement = result.advertisement;

        let adFormatted = {
          id: advertisement.id,
          url: advertisement.url,
          hexImageString: advertisement.hexImage
        }

        this.advertisementService.modifyAdvertisement(adFormatted).subscribe(data => {
           if (data.id == 1) {
             this._snackBar.open('Publicidad modificada', 'Cerrar', {
               duration: 3000
             });
             this.getAllAdvertisement();
           }
        })
      }
    });
  }

  openDeleteDialog(advertisement: IAdvertisement) {
    let newAdvertise: IAdvertisement = {
      id: advertisement.id,
      url: advertisement.url,
      images: advertisement.images
    }

    const dialogRef = this.dialogService.open(DeleteAdvertisementComponent, {
      data: newAdvertise
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let advertisement = result.advertisement;

        let advertisementFormatted = {
          id: advertisement.id,
          url: advertisement.url
        }

        this.advertisementService.deleteAdvertisement(advertisementFormatted).subscribe(data => {
          if (data.id == 1) {
            this.getAllAdvertisement();
            this._snackBar.open('Publicidad eliminada', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }

  reloadTable(advertisement: IAdvertisement[]) {
    this.advertisement = advertisement;
    this.dataSource = new MatTableDataSource<IAdvertisement>(this.advertisement);
    this.dataSource.paginator = this.paginatorAd;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
