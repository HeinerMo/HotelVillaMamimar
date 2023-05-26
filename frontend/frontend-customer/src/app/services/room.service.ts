import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/enviroments/environment';
import { Room } from '../models/Room';
import { MessageDataTransferObject } from '../models/DataTransferObjects/MessageDTO';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  //TODO: Pull price from database

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Room";
  }

  public getRooms(): Observable<ResponseDTO<Room[]>> {
    return this.httpClient.get<ResponseDTO<Room[]>>(`${environment.apiUrl}/${this.controllerURL}/GetRooms`);
  }

  public getAvailableRooms(startDate: string, endDate: string, roomTypeId: number): Observable<ResponseDTO<Room[]>> {
    var request = `${environment.apiUrl}/${this.controllerURL}/GetAvailableRooms/?startDate=${startDate.replaceAll("/", "-")}&endDate=${endDate.replaceAll("/", "-")}&roomTypeId=${roomTypeId}`
    return this.httpClient.get<ResponseDTO<Room[]>>(request);
  }
}