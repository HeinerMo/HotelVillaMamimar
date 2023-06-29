import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-facility',
  templateUrl: './delete-facility.component.html',
  styleUrls: ['./delete-facility.component.css']
})
export class DeleteFacilityComponent {
  constructor(public dialogRef: MatDialogRef<DeleteFacilityComponent>,
    @Inject(MAT_DIALOG_DATA) public facility: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close({id: 1, facility: this.facility})
  }
}
