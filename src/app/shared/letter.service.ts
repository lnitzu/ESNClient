import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { literal } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  //readonly ApiUrl = 'http://localhost:1229/api';
  //readonly ApiUrl = 'http://localhost/esnapi/api';

  readonly ApiUrl = environment.ApiUrl;

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
      
      //return this.http.get(this.ApiUrl+'/Letter/'+selectedLetterTemplate,{'headers': headers });
      return this.http.get(this.ApiUrl+'/Letter',{'headers': headers });
  }


  generateLetters(list:any[], selectedLetterTemplate: number, overWrite:boolean ): Observable<any> {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers','*')
      .set('Access-Control-Allow-Methods', "*");
      
      
      return this.http.post<any>(this.ApiUrl + '/Letter/Generate/'+selectedLetterTemplate +
       '/'+overWrite , JSON.stringify(list), { 'headers': headers });
  }

  deleteLetters(letterID:number,list:any[] ): Observable<any> {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Expose-Headers','*')
      .set('Access-Control-Allow-Methods', "*");
     return this.http.delete(this.ApiUrl + '/Letter/'+ letterID,{headers: headers, observe: 'body', body: JSON.stringify(list) });
  }

}
