import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteFeedbackComponent } from './dialogs/delete-feedback/delete-feedback.component';
import { FeedbackService } from 'src/app/services/feedback.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MoreFeedbackComponent } from './dialogs/more-feedback/more-feedback.component';

export interface IFeedback {
  id: number;
  message: string;
}

@Component({
  selector: 'app-manage-feedback',
  templateUrl: './manage-feedback.component.html',
  styleUrls: ['./manage-feedback.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageFeedbackComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'message', 'actions'];
  feedbacks: IFeedback[] = [];
  dataSource: MatTableDataSource<IFeedback>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnsToDisplayWithExpand: string[];

  expandedFeedback: IFeedback | null | undefined;

  constructor(
    public feedbackServive: FeedbackService,
    public dialogService: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<IFeedback>(this.feedbacks);
    this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getAllFeedbacks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator) {
      this.paginator._intl.nextPageLabel = 'Siguiente';
      this.paginator._intl.previousPageLabel = 'Anterior';
      this.paginator._intl.itemsPerPageLabel = 'Cantidad de quejas o sugerencias por página:';
    }
  }

  getAllFeedbacks() {
    this.feedbackServive.getAllFeedbacks().subscribe((data) => {
      if (data.id === 1) {
        this.reloadTable(data.item);
      }
    });
  }

  openDeleteDialog(feedback: IFeedback) {
    const dialogRef = this.dialogService.open(DeleteFeedbackComponent, {
      data: feedback,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && result.id === 1) {
        const feedbackFormatted = {
          id: result.feedback.id,
          message: result.feedback.message,
        };

        this.feedbackServive.deleteFeedback(feedbackFormatted).subscribe((data) => {
          if (data.id === 1) {
            this.reloadTable(data.item);
            this._snackBar.open('Queda o sugerencia eliminada', 'Cerrar', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  openMoreDialog(feedback: IFeedback) {
    const dialogRef = this.dialogService.open(MoreFeedbackComponent, {
      data: feedback,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && result.id === 1) {
      }
    });
  }

  reloadTable(feedbacks: IFeedback[]) {
    this.feedbacks = feedbacks;
    this.dataSource.data = this.feedbacks;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
