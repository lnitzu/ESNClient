import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostofficeService {

  constructor(private http: HttpClient) { }

  //readonly ApiUrl = 'http://localhost:1229/api';

  //readonly ApiUrl = 'http://localhost/ESNapi/api';
  readonly ApiUrl = environment.ApiUrl;

  getLetters(): Observable<any[]> {

    return this.http.get<any>(this.ApiUrl + "/PostOffice");

  }

  deleteLetter(list: any[]): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers', '*')
      .set('Access-Control-Allow-Methods', "*");


    return this.http.post<any>(this.ApiUrl + '/PostOffice', JSON.stringify(list), { 'headers': headers });


  }




  downloadLink(list: number[]): Observable<HttpResponse<Blob>> {



    return this.http.get<Blob>(this.ApiUrl + '/PostOffice/ViewLetters', {
      observe: 'response',
      responseType: 'blob' as 'json'
    });

  }

  viewLetter(list: number[]): Observable<any> {

    if (list.length == 0) return null as any;
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')

      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers', '*')
      .set('Access-Control-Allow-Methods', "*");


    const options = {
      headers: headers,
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };


    return this.http.post(this.ApiUrl + '/PostOffice/', JSON.stringify(list), { headers: headers, observe: "response", responseType: 'blob' });

  }





  emailLetter(list: number[]): Observable<any> {

    if (list.length == 0) return null as any;
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')

      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers', '*')
      .set('Access-Control-Allow-Methods', "*");


    const options = {
      headers: headers,
      observe: "response" as 'body', // to display the full response & as 'body' for type cast
      responseType: "json"
    };


    return this.http.post(this.ApiUrl + '/PostOffice/EmailLetters', JSON.stringify(list), { headers: headers, observe: "response", responseType: 'blob' });

  }


}
