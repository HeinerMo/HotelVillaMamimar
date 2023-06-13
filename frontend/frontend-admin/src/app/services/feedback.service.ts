import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Feedback";
  }

  public getAllFeedbacks(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetAllFeedbacks`);
  }

  public createFeedback(feedback: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.controllerURL}/CreateFeedback`, feedback);
  }

  public modifyFeedback(feedback: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.controllerURL}/UpdateFeedback`, feedback);
  }

  public deleteFeedback(feedback: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'text/plain');

    return this.httpClient.delete<any>(
      `${environment.apiUrl}/${this.controllerURL}/DeleteFeedback`,
      {
        headers,
        body: JSON.stringify(feedback)
      }
    );
  }
}