import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomTypeService } from 'src/app/services/roomType.service';
import { ViewReservationComponent } from './dialogs/view-reservation/view-reservation.component';

export interface IReservation {
  id: any;
  startingDate:  any;
  endingDate:  any;
  roomId:  any;
  roomType: any;
  customerName:  any;
  customerLastName:  any;
  customerEmail:  any;
  customerCard:  any;
  reservationId: any;
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','customerName','customerLastName','customerEmail','customerCard','startingDate','endingDate','roomId','roomType','actions'];
  reservations: IReservation[] = [];
  dataSource: MatTableDataSource<IReservation> = new MatTableDataSource<IReservation>(this.reservations);

  @ViewChild(MatPaginator) paginatorAd!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public reservationService: ReservationService,
    public roomTypeService: RoomTypeService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) { }

  ngAfterViewInit() {
    this.paginatorAd._intl.nextPageLabel = "Siguiente";
    this.paginatorAd._intl.previousPageLabel = "Anterior";
    this.paginatorAd._intl.itemsPerPageLabel = "Cantidad de reservaciones por pagina:";
    this.getAllReservations();
  }

  getAllReservations() {
    this.reservationService.GetReservationsToList().subscribe((data) => {
      if (data.id === 1) {

        let id: any;
        let startingDate: any
        let endingDate: any;
        let roomId: any;
        let room: any;
        let customer: any;
        let roomType: any;

        this.reservations=[];
        let reservationList: [] = data.item
        reservationList.forEach((a:any) =>{
          let objeto = Object.entries(a);
          id = objeto[0][1]
          startingDate = objeto[1][1]
          endingDate  = objeto[2][1]
          roomId =   objeto[3][1]
          room  = objeto[7][1]
          customer = objeto[6][1]
          let objetCustomer = Object.entries(customer);


          
          // let newStartingDate = new Date(startingDate)
          let newStartingDate = this.getFormattedDate(new Date(startingDate))
          let newEndingDate = this.getFormattedDate(new Date(endingDate))
          
          let cardNumber = objetCustomer[5][1]+'';
          let replacement = "************";
          
          let cardNumberMask = replacement + cardNumber.substring(15);

          const reservation: IReservation = {
              id: 'R'+id+objetCustomer[0][1],
              startingDate: newStartingDate,
              endingDate: newEndingDate,
              roomId: roomId,
              roomType: room,
              customerName:  objetCustomer[1][1]+'',
              customerLastName:  objetCustomer[2][1]+'',
              customerEmail:  objetCustomer[3][1]+'',
              customerCard: cardNumberMask,
              reservationId: id
          }
          this.createReservation(reservation);

        })
        this.reloadTable(this.reservations)
        

      }
    });
  }

  createReservation(reservation :IReservation){
    this.reservations.push(reservation);
  }
  
  deleteReservationById(id:number) {
    console.log(id)
    this.reservationService.DeleteReservation(id).subscribe((data) => {
      if (data.id == 1) {
        this.getAllReservations()
      }
    });
  }

  openViewReservationDialog(reservation: IReservation) {
    const dialogRef = this.dialogService.open(ViewReservationComponent, {
      data: reservation,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && result.id === 1) {
      }
    });
  }

  reloadTable(reservations: IReservation[]) {
    this.reservations = reservations;
    this.dataSource.data = this.reservations;
  }

  getFormattedDate(date: Date): string {
    date = new Date(date)
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

}
