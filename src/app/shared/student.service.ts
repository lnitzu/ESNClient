import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Applicant } from '../applicant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  readonly ApiUrl = 'http://localhost:1229/api';
  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Student');
  }
  

}
