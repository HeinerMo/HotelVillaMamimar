import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {


  constructor(private router: Router, public adminService: AdminService){
  }

  public logOut(){
    this.adminService.logout();
    this.router.navigate(['/login'])
  }

  public isLogged(){

  }


}
