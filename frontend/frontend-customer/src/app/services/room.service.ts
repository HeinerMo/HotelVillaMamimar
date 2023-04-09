import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/enviroments/environment';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  
  private controllerURL: string;
  constructor (private httpClient: HttpClient) { 
    this.controllerURL = "Room";
  }

  public getRooms(): Observable<ResponseDTO<Room[]>> {
    return this.httpClient.get<ResponseDTO<Room[]>>(`${environment.apiUrl}/${this.controllerURL}/GetRooms`);
  }

}