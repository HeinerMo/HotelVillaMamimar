import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/environments/environment';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Room";
  }

  public getRoomsStatus(): Observable<ResponseDTO<Room[]>> {
    return this.httpClient.get<ResponseDTO<Room[]>>(`${environment.apiUrl}/${this.controllerURL}/GetRoomsStatus`);
  }

}