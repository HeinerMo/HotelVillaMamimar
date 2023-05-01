import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Advertisement } from '../models/Advertisement';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/enviroments/environment';

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


}