import { AfterViewInit, ElementRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LetterService } from '../shared/letter.service';
import { DropdownModule } from 'primeng/dropdown';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { PickList } from 'primeng/picklist';


@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  providers: [LetterService, DropdownModule, MessageService]

})
export class LetterComponent implements OnInit {


  viewSpinner: boolean = false;



  availableCandidates: any[] = [];
  letterTemplates: any[] = [];
  selectedCandidates: any[] = [];
  overWrite: boolean = false;
  selectedLetterTemplate: number = 1;

  message: any = '';

  contextMenu: MenuItem[] = [];

  constructor(private letterService: LetterService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }

  @ViewChild(PickList)
  primarySampleComponent!: PickList;

  tip(v: any): string {
    //this.students[0].wll[0].TemplateFile
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

    this.viewSpinner = true;
    var startTime = performance.now();

    var responseJson = JSON.parse(JSON.stringify(this.selectedCandidates));
    var a = [];
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
        this.viewSpinner = false; 

      },
      (err) => {
        this.message = err.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
        this.viewSpinner = false; 
      }    );
      
   
  }
  generate() {
    this.viewSpinner = true;
    var startTime = performance.now();
    var responseJson = JSON.parse(JSON.stringify(this.selectedCandidates));
    var a = [];
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
        this.viewSpinner = false;        
      },
      (err) => {  
        this.message = err.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
        this.viewSpinner = false;        
      });

    


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
