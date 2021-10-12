import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserIdentityService {

  readonly ApiUrl = 'http://localhost:1229/api';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/User');
  }
}
