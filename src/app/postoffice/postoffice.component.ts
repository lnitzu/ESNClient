import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PostofficeService } from '../shared/postoffice.service';

@Component({
  selector: 'app-postoffice',
  templateUrl: './postoffice.component.html',
  styleUrls: ['./postoffice.component.css']
})
export class PostofficeComponent implements OnInit {

  items: MenuItem[]=[];
 letters: any[]=[];
 selectedLetter:any='';

  writtenLetters : any[]=[];
  constructor(private poService:PostofficeService) { }



  viewLetter(id:number){
  


  }

  deleteLetter(id:number){

  }
  ngOnInit(): void {

    this.poService.getLetters().subscribe(
      data=>{
        this.letters =data;
      }

    );
  //  this.letterService.getCandidates(this.).subscribe(data =>{

    //  this.writtenLetters = data;

      this.items = [
        {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewLetter(this.selectedLetter)},
            {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteLetter(this.selectedLetter)}
    ];
  
   // }
   //);


  }

/*
  viewProduct(product: student) {
    this.messageService.add({severity: 'info', summary: 'Product Selected', detail: product.name });
}

deleteProduct(product: Product) {
    this.products = this.products.filter((p) => p.id !== product.id);
    this.messageService.add({severity: 'info', summary: 'Product Deleted', detail: product.name});
    this.selectedProduct = null;
}
*/
}
