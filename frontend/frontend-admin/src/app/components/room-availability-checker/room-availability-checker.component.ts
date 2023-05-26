import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-availability-checker',
  templateUrl: './room-availability-checker.component.html',
  styleUrls: ['./room-availability-checker.component.css'],
  providers: [DatePipe]
})
export class RoomAvailabilityCheckerComponent {
  chosenDate: string = '';

  constructor(private datePipe: DatePipe) {}

  formatDate(date: string): void {
    const formattedDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    console.log(formattedDate)
  }

}
