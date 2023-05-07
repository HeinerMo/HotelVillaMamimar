import { Component, Input, OnInit } from '@angular/core';
import { ICustomerDetail, IRoomChooser } from '../reservation-page.component';

@Component({
  selector: 'app-room-chooser',
  templateUrl: './room-chooser.component.html',
  styleUrls: ['./room-chooser.component.css']
})
export class RoomChooserComponent implements OnInit {
  @Input() inputParams!: IRoomChooser;

  constructor() {}

  ngOnInit() {
    console.log(this.inputParams)

    //this is an example
    //this.inputParams.nextView('xx/xx/xxxx', 'xx/xx/xxxx', -1);
  }
}
