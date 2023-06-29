import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Hotel } from '../models/Hotel';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { Facility } from '../models/Facility';
import { environment } from 'src/environments/environment';

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

  public updateWelcomeInformation(welcomeMessage: string, hexWelcomeImage: string): Observable<any> {
    const url = `${environment.apiUrl}/${this.controllerURL}/UpdateWelcomeInformation`;
  
    let hotelInformation = {
      welcomeMessage: welcomeMessage,
      hexImageString: hexWelcomeImage
    }
  
    return this.httpClient.put<any>(url, hotelInformation);
  }

  public getLocation(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetLocation`);
  }

  public getGalleryAbout(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetGalleryAbout`);
  }

  public getFacilities(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetFacilities`);
  }

  public createFeedback(message: string): Observable<any> {
    let feedback = {
      message: message
    }
    return this.httpClient.post<any>(`${environment.apiUrl}/Feedback/CreateFeedback`, feedback);
  }

  public deleteFacilty(facility: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'text/plain');

    return this.httpClient.delete<any>(
      `${environment.apiUrl}/${this.controllerURL}/DeleteFacility`,
      {
        headers,
        body: JSON.stringify(facility)
      }
    );
  }

  public createFacility(facility: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.controllerURL}/AddFacility`, facility);
  }

  public updateFacility(facility: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.controllerURL}/UpdateFacility`, facility);
  }


}
