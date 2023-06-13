import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseDTO } from '../models/DataTransferObjects/ResponseDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private controllerURL: string;
  constructor(private httpClient: HttpClient) {
    this.controllerURL = "Discount";
  }

  public getAllDiscounts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.controllerURL}/GetAllDiscounts`);
  }

  public createDiscount(discount: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.controllerURL}/CreateDiscount`, discount);
  }

  public modifyDiscount(discount: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.controllerURL}/UpdateDiscount`, discount);
  }

  public deleteDiscount(discount: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', 'text/plain');

    return this.httpClient.delete<any>(
      `${environment.apiUrl}/${this.controllerURL}/DeleteDiscount`,
      {
        headers,
        body: JSON.stringify(discount)
      }
    );
  }
}