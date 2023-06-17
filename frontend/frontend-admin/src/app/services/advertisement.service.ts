import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Advertisement } from '../models/Advertisement';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  
  private controllerURL: string;
  constructor (private httpClient: HttpClient) { 
    this.controllerURL = "Advertisement";
  }

  public getAdvertisement(): Observable<ResponseDTO<Advertisement>> {
    return this.httpClient.get<ResponseDTO<Advertisement>>(`${environment.apiUrl}/${this.controllerURL}/GetAdvertisiment`);
  }

  public deleteAdvertisement(advertisement: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'text/plain');

    return this.httpClient.delete<any>(
      `${environment.apiUrl}/${this.controllerURL}/DeleteAdvertisement`,
      {
        headers,
        body: JSON.stringify(advertisement)
      }
    );
  }

}