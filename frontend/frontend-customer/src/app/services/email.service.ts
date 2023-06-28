import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advertisement } from '../models/Advertisement';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/enviroments/environment';
import { Email } from '../models/Email';


@Injectable({
  providedIn: 'root',
  
})
export class EmailService {
  private controllerURL: string;
  constructor (private httpClient: HttpClient) { 
    this.controllerURL = "Email";
  }


  public SendEmail(email: Email): Observable<ResponseDTO<any>> {
    return this.httpClient.post<ResponseDTO<any>>(`${environment.apiUrl}/${this.controllerURL}/SendEmail`, email);
  }
}
