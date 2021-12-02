import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { UserComponent } from '../user/user.component';



@Injectable({
  providedIn: 'root'
})
export class DataService {


  readonly ApiUrl = 'http://localhost:1229/api';
  constructor(private http: HttpClient) { }


  getBatchList(): Observable<any> {

    return this.http.get<any>(this.ApiUrl + '/Data');
  }



  setCrtIntake(arg: any): Observable<any> {

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', "*")
      .set('Access-Control-Allow-Headers', "*");



    return this.http.post<any>(this.ApiUrl + '/Data/SetCrtBatch', JSON.stringify(arg), { 'headers': headers });

  }

  updateIntake(arg: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', "*")
      .set('Access-Control-Allow-Headers', "*");




    let a = {
      'Username': arg,
      'Name': 'BBBBB',
      'Email': 'email',
      'Image': '',
      'FHAEmpID': '',
      'Dept': '',
      'JobDesc': '',
      'CrtAccess': true
    }


    return this.http.post<any>(this.ApiUrl + '/Data', JSON.stringify(a), { 'headers': headers });
  }



  archiveIntake(arg: any): Observable<any> {
    
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', "*")
      .set('Access-Control-Allow-Headers', "*");


    return this.http.delete<any>(this.ApiUrl + '/Data/1', { 'headers': headers });
  }

  

  downloadLink(): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(this.ApiUrl+'/Data/Export2Excel', {
      observe: 'response',
      responseType: 'blob' as 'json'
    });
  }


  export2Excel(): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers','*')
      .set('Access-Control-Allow-Methods', "*");
      
      return this.http.get(this.ApiUrl+'/Data/Export2Excel',{'headers': headers , responseType:'blob'});
  }
  
}
