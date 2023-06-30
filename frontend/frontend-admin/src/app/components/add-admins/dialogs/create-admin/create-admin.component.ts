import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { IAdmin } from '../../add-admins.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
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
export class CreateAdminComponent {
  formGroup!: FormGroup;
  
  admins: IAdmin[] = [];


  constructor(public dialogRef: MatDialogRef<CreateAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public admin: IAdmin,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }



  ngAfterViewInit(): void {
    this.formGroup.get('userName')?.setValidators([Validators.required]);
    this.formGroup.get('password')?.setValidators([Validators.required]);
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
      this.admin.userName = this.formGroup.get('userName')!.value;
      this.admin.password = this.formGroup.get('password')!.value;
      this.dialogRef.close({ id: 1, admin: this.admin });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ id: 0 });
  }

  isFormValid() {
    return this.formGroup.valid;
  }
}
