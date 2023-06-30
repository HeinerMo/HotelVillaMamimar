import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reservation } from '../models/Reservation';
import { Observable } from 'rxjs';
import { MessageDataTransferObject } from '../models/DataTransferObjects/MessageDTO';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  private controllerURL: string;
  constructor (private httpClient: HttpClient) { 
    this.controllerURL = "Resevation";
  }

  public createReservation(reservation: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.controllerURL}/CreateReservation`, reservation);
  } 

  public GetReservationsToList(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetReservationsToList`);
  }

  public DeleteReservation(id: number): Observable<any>{
    const options = { params: { id: id.toString() } };
    return this.httpClient.delete<any>(`${environment.apiUrl}/${this.controllerURL}/DeleteReservation/`,options);
  }

}