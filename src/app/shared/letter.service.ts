import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LetterService {

  readonly ApiUrl = 'http://localhost:1229/api';

  constructor(private http: HttpClient) { }

  getLetterTemplates(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers','*')
      .set('Access-Control-Allow-Methods', "*");
      
      return this.http.get(this.ApiUrl+'/Letter/GetTemplates',{'headers': headers });
  }


  getCandidates(selectedLetterTemplate: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers','*')
      .set('Access-Control-Allow-Methods', "*");
      
      return this.http.get(this.ApiUrl+'/Letter/'+selectedLetterTemplate,{'headers': headers });
  }


  generateLetters(list:any[], selectedLetterTemplate: number ): Observable<any> {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers','*')
      .set('Access-Control-Allow-Methods', "*");
      
      
      return this.http.post<any>(this.ApiUrl + '/Letter/Generate/'+selectedLetterTemplate, JSON.stringify(list), { 'headers': headers });
  }

}
