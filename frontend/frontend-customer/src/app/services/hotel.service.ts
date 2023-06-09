import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Hotel } from '../models/Hotel';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/enviroments/environment';
import { Facility } from '../models/Facility';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Hotel";
  }

  public getHotel(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetHotelInformation?hotelInforamtionId=1`);
  }

  public getWelcomeImage(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetWelcomeImage`);
  }

  public getLocation(): Observable<ResponseDTO<Location>> {
    return this.httpClient.get<ResponseDTO<Location>>(`${environment.apiUrl}/${this.controllerURL}/GetLocation`);
  }

  public getGalleryAbout(): Observable<any> {
    return this.httpClient.get<ResponseDTO<Hotel>>(`${environment.apiUrl}/${this.controllerURL}/GetGalleryAbout`);
  }

  public getFacilities(): Observable<ResponseDTO<Facility[]>> {
    return this.httpClient.get<ResponseDTO<Facility[]>>(`${environment.apiUrl}/${this.controllerURL}/GetFacilities`);
  }

  public createFeedback(message: string): Observable<any> {
    let feedback = {
      message: message
    }
    return this.httpClient.post<any>(`${environment.apiUrl}/Feedback/CreateFeedback`, feedback);
  }

}
