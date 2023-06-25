import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IRoom, IRoomType } from '../../manage-room.component';
import { RoomTypeService } from 'src/app/services/roomType.service';

@Component({
  selector: 'app-modify-room',
  templateUrl: './modify-room.component.html',
  styleUrls: ['./modify-room.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ModifyRoomComponent implements AfterViewInit, OnInit {
  formGroup!: FormGroup;

  roomTypes: IRoomType[] = [];

  roomTypeControl: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<ModifyRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public room: IRoom,
    private sanitizer: DomSanitizer,
    public roomTypeService: RoomTypeService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      active: new FormControl(this.room.active ? '1' : '0', Validators.required)
    });

    this.roomTypeControl.setValidators([Validators.required]);
    
    this.roomTypeService.getRoomTypes().subscribe(data => {
      if (data.id == 1) {
        Object.assign(this.roomTypes, data.item);

        this.roomTypes.forEach (rt => {
          if (rt.id == this.room.roomTypeId) {
            this.roomTypeControl.setValue(this.room.roomTypeId)
          }
        })        
      }
    })
  }

  ngAfterViewInit(): void {
  }

  getErrorMessage(formControlName: string) {
    const formControl = this.formGroup.get(formControlName);
    if (formControl && formControl.hasError('required')) {
      return 'Required field';
    }
    return '';
  }

  submit() {
    if (this.isFormValid()) {
      this.room.active = this.formGroup.get('active')!.value == '1' ? true : false;
      this.room.roomTypeId = this.roomTypeControl!.value;
      this.dialogRef.close({ id: 1, room: this.room });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFormValid() {
    return this.formGroup.valid && this.roomTypeControl.valid;
  }
}
