import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Season";
  }

  public getAllSeasons(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetAllSeasons`);
  }

  public createSeason(season: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.controllerURL}/CreateSeason`, season);
  }

  public modifySeason(season: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.controllerURL}/UpdateSeason`, season);
  }

  public deleteSeason(season: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'text/plain');

    return this.httpClient.delete<any>(
      `${environment.apiUrl}/${this.controllerURL}/DeleteSeason`,
      {
        headers,
        body: JSON.stringify(season)
      }
    );
  }
}