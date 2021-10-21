import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILookup } from '../ilookup';
import { ISchool } from '../ischool';
import {INurse} from '../inurse';


@Injectable({
  providedIn: 'root'
})


export class LookupService {

  readonly ApiUrl = 'http://localhost:1229/api';



  constructor(private http: HttpClient) { }






  //getLookupValues(): Observable<any[]>{
    getLookupValues(): Observable<any[]>{
  
    return this.http.get<any>(this.ApiUrl+"/Lookup");


    /*
    An Observable is basically a function that can return a stream 
    of values to an observer over time, this can either be synchronously 
    or asynchronously. 
    The data values returned can go from zero to an infinite range of values.
    */
    
  }
}
