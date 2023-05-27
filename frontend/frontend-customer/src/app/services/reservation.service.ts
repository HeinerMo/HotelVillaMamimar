import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';
import { MessageDataTransferObject } from '../models/DataTransferObjects/MessageDTO';
import { environment } from 'src/enviroments/environment';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class ResevationService {
  
  private controllerURL: string;
  constructor (private httpClient: HttpClient) { 
    this.controllerURL = "Resevation";
  }

  public createReservation(reservation: Reservation): Observable<ResponseDTO<any>> {
    return this.httpClient.put<ResponseDTO<any>>(`${environment.apiUrl}/${this.controllerURL}/CreateReservation`, reservation);
  } 

}