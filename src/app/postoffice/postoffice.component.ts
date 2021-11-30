import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { PostofficeService } from '../shared/postoffice.service';
import { LetterService } from '../shared/letter.service';
import { Tree } from 'primeng/tree';
@Component({
  selector: 'app-postoffice',
  templateUrl: './postoffice.component.html',
  styleUrls: ['./postoffice.component.css']
})
export class PostofficeComponent implements OnInit {

  items: MenuItem[] = [];
  //letters: any[] = [];
  //letters: any[] = [];
  //letters: any[] = [];
  //letters: any[] = [];
  selectedLetter!: TreeNode; 

  multiselectedLetters: any[] = [];

  //writtenLetters: any[] = [];

  letterTemplates: any[] = [];


  files: TreeNode[] = []


  selectedNode: any = ''
  cols: any[] =  [];

  constructor(private poService: PostofficeService, private letterService: LetterService) { }



  nodeSelect(event: any) {
    //if(!event.node.children) {
      this.selectedLetter = event.node.data;
      console.log(this.selectedLetter);
      //this.getParentDetails(event.node)
      alert('fff');
    //}
  }

  viewLetter(letter : TreeNode) {
   // this.messageService.add({severity: 'info', summary: 'Product Selected', detail: product.name });
//alert(letter);
console.log(letter);

  }

  deleteLetter(id: any) {

  }
  ngOnInit(): void {

    //get the applicants with letters
    this.poService.getLetters().subscribe(

      data => {
        this.files = <TreeNode[]>data;
        //console.log(this.files);
      }

    );
    

    this.letterService.getLetterTemplates().subscribe(
      data => {this.letterTemplates = data;  }
    );


    this.items = [
      { label: 'View letter', icon: 'pi pi-fw pi-search', command: () => this.viewLetter(this.selectedLetter) },
      { label: 'Delete letter', icon: 'pi pi-fw pi-times', command: () => this.deleteLetter(this.selectedLetter) }
    ];

    this.cols = [
      { field: "name", header: "FullName" ,icon: "icon"}
      //{ field: "size", header: "Size" },
      //{ field: "type", header: "Type" }
    ];
 
  }


  expandNodes(nodes:any) {
    for (let node of nodes) {
      node.expanded = true;
    }
    this.files = [...this.files];
  }

  collapseNodes(nodes:any) {
    for (let node of nodes) {
      node.expanded = false;
    }
    this.files = [...this.files];
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
