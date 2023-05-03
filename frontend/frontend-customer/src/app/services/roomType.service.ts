import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/enviroments/environment';
import { RoomType } from '../models/RoomType';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  
  private controllerURL: string;
  constructor (private httpClient: HttpClient) { 
    this.controllerURL = "RoomType";
  }

  public getRoomTypes(): Observable<ResponseDTO<RoomType[]>> {
    return this.httpClient.get<ResponseDTO<RoomType[]>>(`${environment.apiUrl}/${this.controllerURL}/GetRoomTypes`);
  }

}
