import { Component, OnInit } from '@angular/core';
import { LetterService } from '../shared/letter.service';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNGConfig } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
  providers: [LetterService, DropdownModule,MessageService]

})
export class LetterComponent implements OnInit {

  availableCandidates: any[] = [];
  letterTemplates: any[] = [];
  selectedCandidates: any[] = [];
  overWrite: boolean=false;
  selectedLetterTemplate: number = 1;

  message:any='';


  constructor(private letterService: LetterService, private primengConfig: PrimeNGConfig, private messageService: MessageService,) { }


  generate() {

    var responseJson = JSON.parse(JSON.stringify(this.selectedCandidates));
    var a=[];
    for (var i = 0; i < responseJson.length; i++) 
    {
      var counter = responseJson[i];
      var schID=counter.RecID
      a.push(schID)
    }
    


    this.letterService.generateLetters(a, this.selectedLetterTemplate, this.overWrite).subscribe(
      

      (data)=>{
        this.message= data.message;
        this.availableCandidates=data.candidates;
        this.selectedCandidates=[];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message, life: 4000 });
        
      },
      (err)=>{
        this.message= err.error;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
      });

    

  }



  onChangeTemplate(event:any) {
//    this.selectedLetterTemplate = event.value;
    this.letterService.getCandidates(this.selectedLetterTemplate).subscribe(data => {
      //this.availableCandidates = data.candidates_without_letters;
     // this.selectedCandidates= [] ;//data.candidates_with_letters;

    
    });    
}


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.letterService.getCandidates(this.selectedLetterTemplate).subscribe(data => {
      this.availableCandidates = data;
      //this.selectedCandidates= data.candidates_with_letters;

      //this.availableCandidates.splice(0,1);
      //this.selectedCandidates.push(this.availableCandidates[0]);
      
    
    });

    
    this.letterService.getLetterTemplates().subscribe(
      data => {
        this.letterTemplates = data;
      }
    );
  }

}
