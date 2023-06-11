import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Admin } from 'src/app/models/Admin';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface IAdmin {
  id: number;
  userName: string;
  password: string;
}

@Component({
  selector: 'app-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.css']
})
export class AddAdminsComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['userName'];
  admins: IAdmin[] = []
  dataSource = new MatTableDataSource<IAdmin>(this.admins);

  userNameControl: FormControl = new FormControl();
  passwordControl: FormControl = new FormControl();
  confirmPasswordControl: FormControl = new FormControl();

  constructor(private adminService: AdminService) { }


  passwordMatchValidator(control: AbstractControl) {
    const password = this.passwordControl.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  sendRequest() {
    if (this.userNameControl.valid && this.passwordControl.valid && this.confirmPasswordControl.valid) {
      if (this.passwordControl.value === this.confirmPasswordControl.value) {

        var admin: Admin = new Admin({ userName: this.userNameControl.value, password: this.passwordControl.value });

        this.adminService.CreateAdmin(admin).subscribe((responseDto) => {
          if (responseDto.id == 0) {
            console.log("Todo bien");
          } else {
            this.userNameControl.setValue("");
            this.passwordControl.setValue("");
            this.confirmPasswordControl.setValue("");
          }
        });

      }
    } else {
      this.userNameControl.markAsTouched();
      this.passwordControl.markAsTouched();
      this.confirmPasswordControl.markAsTouched();
    }
    this.updateAdmins();
  }

  ngOnInit(): void {
    this.userNameControl.setValidators([Validators.required]);
    this.passwordControl.setValidators([Validators.required]);
    this.confirmPasswordControl.setValidators([
      Validators.required,
      (control: AbstractControl) => this.passwordMatchValidator(control)
    ]);
    
    this.updateAdmins();
    this.updateAdmins();

  }

  updateAdmins() {
    this.adminService.getAdmins().subscribe(data => {
      if (data.id == 1 && data.item != undefined) {
        this.admins = data.item.map(admin => ({
          id: admin.id!,
          userName: admin.userName!,
          password: admin.password!
        }));
      } else {
        this.admins = []; // Limpiar el arreglo si no hay administradores
      }
      this.dataSource = new MatTableDataSource<IAdmin>(this.admins);
      this.dataSource.paginator = this.paginator;
    });

  }

}
