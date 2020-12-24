import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams, HttpClientJsonpModule } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  govServerIp: string;
  govPublicKey: string;
  onCovidDataChanged$: BehaviorSubject<any>;
  httpOptions: any;
  constructor(
    private http: HttpClient,
  ) {
    this.onCovidDataChanged$ = new BehaviorSubject(null);
    this.govServerIp = 'http://localhost:3000/api';
  }

  getCovidData(page, numOfRow, startDate, endDate): Observable<any> {
    // tslint:disable-next-line: ban-types
    let params = new HttpParams();
    params = params.append('pageNo', page);
    params = params.append('numOfRows', numOfRow);
    params = params.append('startCreateDt', startDate);
    params = params.append('endCreateDt', endDate);

    const resUrl = `${this.govServerIp}`;
    console.log(resUrl);
    return this.http.get(resUrl, {params});
  }
}
