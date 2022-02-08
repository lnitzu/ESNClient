import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { interval,  Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {

  //readonly ApiUrl = 'http://localhost:1229/api';
  //readonly ApiUrl = 'http://localhost/ESNapi/api';

  readonly ApiUrl = environment.ApiUrl;// 'http://localhost/ESNapi/api';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]> {

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    return this.http.get<any>(this.ApiUrl + '/User', { 'headers': headers  });
  }
}
