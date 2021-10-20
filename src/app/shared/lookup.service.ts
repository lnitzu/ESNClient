import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILookup } from '../ilookup';
import { ISchool } from '../ischool';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  readonly ApiUrl = 'http://localhost:1229/api';



  constructor(private http: HttpClient) { }

  getLookupValues(): Observable<any>{
    return this.http.get<ISchool>(this.ApiUrl+"/Lookup");
    
    
  }
}
