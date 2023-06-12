import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SeasonService } from 'src/app/services/season.service';
import { CreateSeasonComponent } from './dialogs/create-season/create-season.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModifySeasonComponent } from './dialogs/modify-season/modify-season.component';
import * as moment from 'moment';
import { DeleteSeasonComponent } from './dialogs/delete-season/delete-season.component';

export interface ISeason {
  id: number;
  name: string;
  porcentage: number;
  startingDate: Date;
  endingDate: Date;
}

@Component({
  selector: 'app-manage-seasons',
  templateUrl: './manage-seasons.component.html',
  styleUrls: ['./manage-seasons.component.css']
})
export class ManageSeasonsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'percentage', 'starting-date', 'ending-date', 'actions'];
  seasons: ISeason[] = []
  dataSource: MatTableDataSource<ISeason> = new MatTableDataSource<ISeason>(this.seasons);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public seasonServive: SeasonService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.itemsPerPageLabel = "Cantidad de temporadas por página:";
    this.getAllSeasons();
  }

  getAllSeasons() {
    this.seasonServive.getAllSeasons().subscribe(data => {
      if (data.id == 1) {
        data.item.forEach((season: ISeason) => {
          let startingDate = new Date(season.startingDate);
          let endingDate = new Date(season.endingDate)
          season.startingDate = startingDate;
          season.endingDate = endingDate;
        });
        this.reloadTable(data.item)
      }
    })
  }

  openCreateDialog() {
    const dialogRef = this.dialogService.open(CreateSeasonComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let season = result.season;

        let startingDate = `${season.startingDate._i.year}-${season.startingDate.format("MM")}-${season.startingDate._i.date}`;
        let endingDate = `${season.endingDate._i.year}-${season.endingDate.format("MM")}-${season.endingDate._i.date}`;

        let seasonFormatted = {
          name: season.name,
          porcentage: (Number)(season.porcentage),
          startingDate: startingDate,
          endingDate: endingDate
        }
        this.seasonServive.createSeason(seasonFormatted).subscribe(data => {
          if (data.id == 1) {
            data.item.forEach((season: ISeason) => {
              let startingDate = new Date(season.startingDate);
              let endingDate = new Date(season.endingDate)
              season.startingDate = startingDate;
              season.endingDate = endingDate;
            });
            this.reloadTable(data.item)
            this._snackBar.open('Temporada creada', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }

  openModifyDialog(season: ISeason) {
    let newSeason: ISeason = {
      id: season.id,
      name: season.name,
      porcentage: season.porcentage,
      startingDate: season.startingDate,
      endingDate: season.endingDate
    }

    const dialogRef = this.dialogService.open(ModifySeasonComponent, {
      data: newSeason
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let season = result.season;
        season.startingDate = moment(new Date(season.startingDate));
        season.endingDate = moment(new Date(season.endingDate));

        let startingDate = `${season.startingDate.format("YYYY")}-${season.startingDate.format("MM")}-${season.startingDate.format("DD")}`;
        let endingDate = `${season.endingDate.format("YYYY")}-${season.endingDate.format("MM")}-${season.endingDate.format("DD")}`;

        let seasonFormatted = {
          id: season.id,
          name: season.name,
          porcentage: (Number)(season.porcentage),
          startingDate: startingDate,
          endingDate: endingDate
        }

        this.seasonServive.modifySeason(seasonFormatted).subscribe(data => {
          if (data.id == 1) {
            this._snackBar.open('Temporada modificada', 'Cerrar', {
              duration: 3000
            });
            this.getAllSeasons();
          }
        })
      }
    });
  }

  openDeleteDialog(season: ISeason) {
    let newSeason: ISeason = {
      id: season.id,
      name: season.name,
      porcentage: season.porcentage,
      startingDate: season.startingDate,
      endingDate: season.endingDate
    }

    const dialogRef = this.dialogService.open(DeleteSeasonComponent, {
      data: newSeason
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id === 1) {
        let season = result.season;
        season.startingDate = moment(new Date(season.startingDate));
        season.endingDate = moment(new Date(season.endingDate));

        let startingDate = `${season.startingDate.format("YYYY")}-${season.startingDate.format("MM")}-${season.startingDate.format("DD")}`;
        let endingDate = `${season.endingDate.format("YYYY")}-${season.endingDate.format("MM")}-${season.endingDate.format("DD")}`;

        let seasonFormatted = {
          id: season.id,
          name: season.name,
          porcentage: (Number)(season.porcentage),
          startingDate: startingDate,
          endingDate: endingDate
        }

        this.seasonServive.deleteSeason(seasonFormatted).subscribe(data => {
          if (data.id == 1) {
            data.item.forEach((season: ISeason) => {
              let startingDate = new Date(season.startingDate);
              let endingDate = new Date(season.endingDate)
              season.startingDate = startingDate;
              season.endingDate = endingDate;
            });
            this.reloadTable(data.item)
            this._snackBar.open('Temporada eliminada', 'Cerrar', {
              duration: 3000
            });
          }
        })
      }
    });
  }

  reloadTable(seasons: ISeason[]) {
    this.seasons = seasons;
    this.dataSource = new MatTableDataSource<ISeason>(this.seasons);
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
