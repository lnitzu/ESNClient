import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class StudentService {

  //readonly ApiUrl = 'http://localhost:1229/api';
  //readonly ApiUrl = 'http://localhost/ESNapi/api';

  readonly ApiUrl = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Student');
  }
  

  updateStudent(val: any)  {
   
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    return this.http.put(this.ApiUrl +'/Student', val,{ 'headers': headers  });
  }

  deleteStudent(val:any){


    const options = {
      headers: new HttpHeaders(
        {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }),
      body: { student: val }
    };
    return this.http.delete(this.ApiUrl +'/Student/'+ val.RecID, options);

  }

}
