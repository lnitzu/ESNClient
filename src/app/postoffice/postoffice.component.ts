import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { PostofficeService } from '../shared/postoffice.service';
import { LetterService } from '../shared/letter.service';
@Component({
  selector: 'app-postoffice',
  templateUrl: './postoffice.component.html',
  styleUrls: ['./postoffice.component.css']
})
export class PostofficeComponent implements OnInit {

  items: MenuItem[] = [];
  letters: any[] = [];
  selectedLetter: any = '';

  multiselectedLetters: any[] = [];

  writtenLetters: any[] = [];

  letterTemplates: any[] = [];


  //files: TreeNode[] = [];
  selectedNode: any = ''
  cols: any[] =  [];

  constructor(private poService: PostofficeService, private letterService: LetterService) { }





  viewLetter(id: number) {



  }

  deleteLetter(id: number) {

  }
  ngOnInit(): void {

    this.poService.getLetters().subscribe(
      data => {
        this.letters = data;
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
      { field: "name", header: "Name" },
      { field: "size", header: "Size" },
      { field: "type", header: "Type" }
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



  files : TreeNode[]=
  [  
      {  
          "data":{  
              "name":"Level 1a",
              "size":"200mb",
              "type":"Folder"
          },
          "children":[  
              {  
                  "data":{  
                      "name":"Level 2a",
                      "size":"25mb",
                      "type":"Folder"
                  }
              },
              {  
                  "data":{  
                      "name":"Level 2b",
                      "size":"25mb",
                      "type":"Application"
                  }
              }

          ]
      },
      {  
          "data":{  
              "name":"Level 1b",
              "size":"20mb",
              "type":"Folder"
          },
          "children":[  
              {  
                  "data":{  
                      "name":"Level 2d",
                      "size":"10mb",
                      "type":"Zip"
                  }
              },
              {  
                  "data":{  
                      "name":"Level 2e",
                      "size":"10mb",
                      "type":"Zip"
                  }
              }
          ]
      }


  ]





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
