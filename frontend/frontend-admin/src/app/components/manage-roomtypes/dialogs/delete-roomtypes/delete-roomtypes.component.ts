import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-roomtypes',
  templateUrl: './delete-roomtypes.component.html',
  styleUrls: ['./delete-roomtypes.component.css']
})
export class DeleteRoomtypesComponent {
  constructor(public dialogRef: MatDialogRef<DeleteRoomtypesComponent>,
    @Inject(MAT_DIALOG_DATA) public roomType: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close({id: 1, roomType: this.roomType})
  }
}