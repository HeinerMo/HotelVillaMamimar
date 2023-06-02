import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';
import { AdminToLogin } from 'src/app/models/AdminToLogin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNameControl: FormControl = new FormControl("", [Validators.required, Validators.pattern(/[a-zA-ZÁ-Úá-ú].*/)]);
  userPasswordControl: FormControl = new FormControl("", [Validators.required]);
  isLoginIncorrect: boolean = false;
  messageToShow: string = "";

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    if (this.adminService.isLoggedIn() && this.router.url == "/login") {
      this.router.navigate(['/']);
    }
  }

  public isLoginValid(): boolean {
    return this.userNameControl.valid && this.userPasswordControl.valid;
  }

  onLogin(): void {
    if (this.isLoginValid()) {
      var adminToLogin:AdminToLogin = new AdminToLogin({userName: this.userNameControl.value, password: this.userPasswordControl.value});
      this.adminService.login(adminToLogin).subscribe((responseDto) => {
        if (responseDto.id == 0) {
          this.isLoginIncorrect = true;
          this.messageToShow = responseDto.message!;
        } else {
          var admin: Admin =  responseDto.item!;
          this.adminService.setUserInCookies(admin);
          if (this.router.url == "/login") {
           
              this.adminService.setLoggedIn(true);
              this.router.navigate(['/home'])
            
          } 
        }
      });
    }
  }

}
