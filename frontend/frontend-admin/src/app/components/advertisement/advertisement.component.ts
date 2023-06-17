import { AfterViewInit, Component,ViewChild } from '@angular/core';
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
import { EditAdvertisementComponent } from './dialogs/edit-advertisement/edit-advertisement.component';



export interface IAdvertisement {
  id: number;
  url: string;
  image: any;
}

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'url','actions'];
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

  getAllAdvertisement() {
    this.advertisementService.getAdvertisement().subscribe((data: any) => {

      if (data.id == 1) {
        let item: [] = data.item;
        let link: any;
        let image:any;
        let id: any; 
        item.forEach((a:any) => {
          let objeto = Object.entries(a);
          id = objeto[0][1];
          link = objeto[1][1];
          image = objeto[2][1];
          let decodedBytes: Uint8Array;
          decodedBytes = toByteArray(image[0].image.imageData);
          const blob = new Blob([decodedBytes], { type: 'image/jpg' });
          let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
          const advertisement: IAdvertisement = {
            id: id,
            url: link,
            image: url
          }
         this.createAdvertise(advertisement)
        });
        this.reloadTable(this.advertisement)
      }
    })
  }

  createAdvertise(ad :IAdvertisement){
    this.advertisement.push(ad);
  }

  openCreateDialog() {
    const dialogRef = this.dialogService.open(CreateAdvertisementComponent, {
      data: {}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result != undefined && result.id === 1) {
    //     let season = result.season;

    //     let startingDate = `${season.startingDate._i.year}-${season.startingDate.format("MM")}-${season.startingDate._i.date}`;
    //     let endingDate = `${season.endingDate._i.year}-${season.endingDate.format("MM")}-${season.endingDate._i.date}`;

    //     let seasonFormatted = {
    //       name: season.name,
    //       porcentage: (Number)(season.porcentage),
    //       startingDate: startingDate,
    //       endingDate: endingDate
    //     }
    //     this.seasonServive.createSeason(seasonFormatted).subscribe(data => {
    //       if (data.id == 1) {
    //         data.item.forEach((season: ISeason) => {
    //           let startingDate = new Date(season.startingDate);
    //           let endingDate = new Date(season.endingDate)
    //           season.startingDate = startingDate;
    //           season.endingDate = endingDate;
    //         });
    //         this.reloadTable(data.item)
    //         this._snackBar.open('Temporada creada', 'Cerrar', {
    //           duration: 3000
    //         });
    //       }
    //     })
    //   }
    // });
  }

  openModifyDialog(advertisement: IAdvertisement) {
    let newAdvertise: IAdvertisement = {
      id: advertisement.id,
      url: advertisement.url,
      image: advertisement.image
    }

    const dialogRef = this.dialogService.open(EditAdvertisementComponent, {
      data: newAdvertise
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let advertisement = result.advertisement;
       
        // let seasonFormatted = {
        //   id: season.id,
        //   name: season.name,
        //   porcentage: (Number)(season.porcentage),
        //   startingDate: startingDate,
        //   endingDate: endingDate
        // }

        // this.seasonServive.modifySeason(seasonFormatted).subscribe(data => {
        //   if (data.id == 1) {
        //     this._snackBar.open('Temporada modificada', 'Cerrar', {
        //       duration: 3000
        //     });
        //     this.getAllSeasons();
        //   }
        // })
      }
    });
  }

  openDeleteDialog(advertisement: IAdvertisement) {
    let newAdvertise: IAdvertisement = {
      id: advertisement.id,
      url: advertisement.url,
      image: advertisement.image
    }

    const dialogRef = this.dialogService.open(DeleteAdvertisementComponent, {
      data: newAdvertise
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let advertisement = result.advertisement;

        let Formmatted = {

        }

        let advertisementFormatted = {
          id: advertisement.id,
          url: advertisement.url
        }

        this.advertisementService.deleteAdvertisement(advertisementFormatted).subscribe(data => {
          if (data.id == 1) {
            let item: [] = data.item;
            let link: any;
            let image:any;
            let id: any; 
            this.advertisement = [];
            item.forEach((a:any) => {
              let objeto = Object.entries(a);
              id = objeto[0][1];
              link = objeto[1][1];
              image = objeto[2][1];
              let decodedBytes: Uint8Array;
              decodedBytes = toByteArray(image[0].image.imageData);
              const blob = new Blob([decodedBytes], { type: 'image/jpg' });
              let url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
              const advertisement: IAdvertisement = {
                id: id,
                url: link,
                image: url
              }
              this.createAdvertise(advertisement)
            });
            this.reloadTable(this.advertisement)
            this._snackBar.open('Temporada eliminada', 'Cerrar', {
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
