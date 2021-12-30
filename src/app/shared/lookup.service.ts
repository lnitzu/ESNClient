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
    getLookupValues(): Observable<any[]>{
    return this.http.get<any>(this.ApiUrl+"/Lookup");
  }



  updateSchool(val: any)  {
   
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.put(this.ApiUrl +'/Lookup/UpdateSchool', val,{ 'headers': headers  });
  }


  deleteSchool(val:any){
 

    const options = {
      headers: new HttpHeaders(
        {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }),
      body: { school: val }
    };
    return this.http.delete(this.ApiUrl +'/Lookup/DeleteSchool/'+ val.ID, options);
    

  }



}
