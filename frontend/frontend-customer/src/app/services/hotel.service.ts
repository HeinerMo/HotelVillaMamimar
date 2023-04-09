import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../models/Hotel';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  
  private controllerURL: string;
  constructor (private httpClient: HttpClient) { 
    this.controllerURL = "Hotel";
  }

  public getHotel(): Observable<ResponseDTO<Hotel>> {
    return this.httpClient.get<ResponseDTO<Hotel>>(`${environment.apiUrl}/${this.controllerURL}/GetHotel`);
  }

}
