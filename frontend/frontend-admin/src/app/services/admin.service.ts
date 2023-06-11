import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { AdminToLogin } from '../models/AdminToLogin';
import {Admin} from '../models/Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private controllerURL: string;

  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Admin";
  }

  public logout() {
    this.setLoggedIn(false);
    this.setUserId(-1);
    this.setUserName('');
    return of({ success: this.isLoggedIn});
  }

  public login(admin:AdminToLogin): Observable<ResponseDTO<Admin>> {   
    return this.httpClient.post<ResponseDTO<Admin>>(`${environment.apiUrl}/${this.controllerURL}/AuthenticateUser`, admin);
  }

  public setUserInCookies(admin: Admin) {
    this.setUserId(admin.id!);
    this.setUserName(admin.userName!);
  }

  public setUserName(userName: string) {
    localStorage.setItem('USERNAME', userName);
  }

  public getUserName() {
    return localStorage.getItem('USERNAME')!;
  }


  public getUserId(): number {
    return parseInt(localStorage.getItem('userId')!);
  }

  public setUserId(adminId: number) {
    localStorage.setItem('userId', `${adminId}`);
  }

  public setLoggedIn(isLoggedIn:boolean) {
    console.log("we")

    if (isLoggedIn) {
      localStorage.setItem('STATE', 'true');
    } else {
      localStorage.setItem('STATE', 'false');
    }
  }

  public isLoggedIn():boolean {

    return (localStorage.getItem('STATE') == 'true');
  }


  public CreateAdmin(admin:Admin): Observable<ResponseDTO<Admin>> {   
    return this.httpClient.put<ResponseDTO<any>>(`${environment.apiUrl}/${this.controllerURL}/CreateAdmin`, admin);
  }

  public getAdmins(): Observable<ResponseDTO<Admin[]>> {
    return this.httpClient.get<ResponseDTO<Admin[]>>(`${environment.apiUrl}/${this.controllerURL}/GetAdmins`);
  }

}