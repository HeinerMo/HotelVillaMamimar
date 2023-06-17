import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { RoomType } from '../models/RoomType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "RoomType";
  }

  public getRoomTypes(): Observable<ResponseDTO<RoomType[]>> {
    return this.httpClient.get<ResponseDTO<RoomType[]>>(`${environment.apiUrl}/${this.controllerURL}/GetRoomTypes`);
  }

  public getRoomTypeFinalPrice(roomTypeId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/getRoomTypeFinalPrice/?roomTypeId=${roomTypeId}`);
  }

  public getAllRoomTypes(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetAllRoomTypes`);
  }

  public createRoomType(roomType: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.controllerURL}/CreateRoomType`, roomType);

  }

  public updateRoomType(roomType: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.controllerURL}/UpdateRoomType`, roomType);
  }

  public deleteRoomType(roomType: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'text/plain');

    return this.httpClient.delete<any>(
      `${environment.apiUrl}/${this.controllerURL}/DeleteRoomType`,
      {
        headers,
        body: JSON.stringify(roomType)
      }
    );
  }
}
