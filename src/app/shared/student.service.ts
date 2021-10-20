import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class StudentService {

  readonly ApiUrl = 'http://localhost:1229/api';
  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Student');
  }
  

  updateJob(val: any) {
   
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    
    return this.http.put(this.ApiUrl +'/jobs', val,{ 'headers': headers });
  }

}
