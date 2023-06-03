import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { Room } from '../models/Room';
import { MessageDataTransferObject } from '../models/DataTransferObjects/MessageDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Room";
  }

  public getAvailableRoomsToAdmin(startDate: string, endDate: string, roomTypeId: number): Observable<ResponseDTO<any[]>> {
    var request = `${environment.apiUrl}/${this.controllerURL}/GetAvailableRoomsToAdmin/?startDate=${startDate}&endDate=${endDate}&roomTypeId=${roomTypeId}`
    return this.httpClient.get<ResponseDTO<any[]>>(request);
  }
}