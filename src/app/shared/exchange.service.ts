import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';




declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
 
  


  private connection: any;
  private proxy: any;
  
  

  public   message: any='test';

   
  constructor() { }
  public init() {
    

    let url = 'http://localhost:1229';
    this.connection = $.hubConnection(url);
    this.proxy = this.connection.createHubProxy('SignalHub');

    this.proxy.on('Hello', (data:any)=>{

      this.message = data;
      
      //console.log('La client:' +this.message);
       
    });

    this.connection.start().done((data: any) => {

      //('Connected to signalhub');
      this.broadcastMessage("Now we start talking");
      
    });
    
  }

  public broadcastMessage(x: string): void {
    
    this.proxy.invoke('Hello', x)
      .catch((error: any) => {
        //console.log('broadcastMessage error -> ' + error);
      });

      
  }


}
