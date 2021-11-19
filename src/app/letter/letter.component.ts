import { Component, OnInit } from '@angular/core';
import { LetterService } from '../shared/letter.service';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css'],
  providers: [LetterService, DropdownModule]

})
export class LetterComponent implements OnInit {

  availableCandidates: any[] = [];
  letterTemplates: any[] = [];
  selectedCandidates: any[] = [];
  selectedLetterTemplate: any = [];

  //sourceProducts: Student[];

  //targetProducts: Product[];

  constructor(private letterService: LetterService, private primengConfig: PrimeNGConfig) { }


  generate() {

    var responseJson = JSON.parse(JSON.stringify(this.selectedCandidates));
    var a=[];
    
    for (var i = 0; i < responseJson.length; i++) 
    {
      var counter = responseJson[i];
      var schID=counter.RecID

      a.push(schID)
    }
    


    this.letterService.generateLetters(a).subscribe(
      data=>{

      }
    )

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.letterService.getCandidates().subscribe(data => {
      this.availableCandidates = data;
    });

    this.letterService.getLetterTemplates().subscribe(
      data => {
        this.letterTemplates = data;
      }
    );
  }

}
