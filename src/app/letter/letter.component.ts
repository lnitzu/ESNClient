import { AfterViewInit, ElementRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LetterService } from '../shared/letter.service';
import { DropdownModule } from 'primeng/dropdown';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { PickList } from 'primeng/picklist';

import { interval, Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';



declare var $: any;

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  providers: [LetterService, DropdownModule, MessageService]

})
export class LetterComponent implements OnInit {

  private connection: any;
  private proxy: any;
  public serverMsg: any = '';
  statusNum: number = 0;



  public init() {


    //let url = 'http://localhost:1229';
    //let url = 'http://localhost/esnapi'; //address for signalr
    let url = environment.url;
    this.connection = $.hubConnection(url);
    this.proxy = this.connection.createHubProxy('SignalHub');

    this.proxy.on('Hello', (data: any) => {
      var y: number = +data;
      
      
      if (this.selectedCandidates.length > 0)
        this.statusNum = Math.round(100 * y / (this.selectedCandidates.length));
      

    });

    this.connection.start().done((data: any) => {

    });

  }

  public close() {
    $.connection.hub.stop().done(function () {
      // alert('stopped');
    });
  }

  public broadcastMessage(x: string): void {

    this.proxy.invoke('Hello', x)
      .catch((error: any) => {
        console.log('broadcastMessage error -> ' + error);
      });

  }

  viewSpinner: boolean = false;
  viewProgress: boolean = false;
  availableCandidates: any[] = [];
  letterTemplates: any[] = [];
  selectedCandidates: any[] = [];
  overWrite: boolean = false;
  selectedLetterTemplate: number = 1;

  message: any = '';






  contextMenu: MenuItem[] = [];

  constructor(private letterService: LetterService, private primengConfig: PrimeNGConfig,
    private messageService: MessageService

  ) { }




  tip(v: any): string {

    let x: string;
    x = "<ul>";
    for (var k = 0; k < v.length; k++) {
      x = x + '<li>' + v[k].TemplateName + ' ' + this.formatDate(v[k].CreateDate) + '</li>';
    }
    return x + '</ul></span>';

  }

  formatDate(date_obj: Date) {
    let date_ob = new Date(date_obj);

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = ("0" + (date_ob.getMinutes() + 1)).slice(-2);

    // current seconds
    //let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes);
  }


  delete() {

    this.statusNum=0;
    this.init();
    //this.viewSpinner = true;
    this.viewProgress = true;
    var startTime = performance.now();

    var responseJson = JSON.parse(JSON.stringify(this.selectedCandidates));
    let a = [];
    for (var i = 0; i < responseJson.length; i++) {
      var counter = responseJson[i];
      for (let k = 0; k < counter.wll.length; k++) {
        a.push(counter.wll[k].RecID);
      }
    }

    this.letterService.deleteLetters(this.selectedLetterTemplate, a).subscribe(

      (data) => {

        this.message = data.message;
        this.availableCandidates = data.candidates;
        this.selectedCandidates = [];
        var endTime = performance.now()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message + ' in ' + (Math.round((endTime - startTime) / 1000)).toString() + ' sec.', life: 4000 });
        //this.viewSpinner = false;
        this.viewProgress = false;

      },
      (err) => {
        this.message = err.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
        //this.viewSpinner = false;
        this.viewProgress = false;
      });


  }
  generate() {
    this.statusNum=0;
    this.init();
    this.viewProgress = true;
    var startTime = performance.now();
    var responseJson = JSON.parse(JSON.stringify(this.selectedCandidates));
    let a = [];
    for (var i = 0; i < responseJson.length; i++) {
      var counter = responseJson[i];
      var schID = counter.RecID
      a.push(schID)
    }



    this.letterService.generateLetters(a, this.selectedLetterTemplate, this.overWrite).subscribe(


      (data) => {

        this.message = data.message;
        this.availableCandidates = data.candidates;
        this.selectedCandidates = [];
        var endTime = performance.now()
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message + ' in ' + (Math.round((endTime - startTime) / 1000)).toString() + ' sec.', life: 4000 });
        this.viewProgress = false;


      },
      (err) => {
        this.message = err.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
        this.viewProgress = false;
      });


      close();

  }






  onChangeTemplate(event: any) {
    //    this.selectedLetterTemplate = event.value;
    this.letterService.getCandidates(this.selectedLetterTemplate).subscribe(data => {
      //this.availableCandidates = data.candidates_without_letters;
      // this.selectedCandidates= [] ;//data.candidates_with_letters;


    });
  }



  ngOnInit(): void {



    this.viewSpinner = true;

    this.primengConfig.ripple = true;
    this.letterService.getCandidates(this.selectedLetterTemplate).subscribe(data => {
      this.availableCandidates = data;
      this.viewSpinner = false;
    });


    this.letterService.getLetterTemplates().subscribe(
      data => {
        this.letterTemplates = data;
      }
    );


  }

}
