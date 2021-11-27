import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostofficeService {

  constructor(private http: HttpClient) { }

  readonly ApiUrl = 'http://localhost:1229/api';


  getLetters(): Observable<any[]> {

    return this.http.get<any>(this.ApiUrl + "/PostOffice");

  }

  deleteLetter(list:any[]):Observable<any>{
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers','*')
      .set('Access-Control-Allow-Methods', "*");
      
      
      return this.http.post<any>(this.ApiUrl + '/PostOffice', JSON.stringify(list), { 'headers': headers });
 

  }
}
