import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { PostofficeService } from '../shared/postoffice.service';
import { LetterService } from '../shared/letter.service';
import { Tree } from 'primeng/tree';
import { HttpResponse } from '@angular/common/http';
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
  selectedLetter: TreeNode[] = [];

  multiselectedLetters: any[] = [];

  //writtenLetters: any[] = [];

  letterTemplates: any[] = [];

  file: any = [];
  files: TreeNode[] = [];


  selectedNode: any[] = [];
  cols: any[] = [];

  constructor(private poService: PostofficeService, private letterService: LetterService) { }



  nodeSelect(event: any) {
    //if(!event.node.children) {
    this.selectedLetter = event;
    //console.log(this.selectedLetter);
    //this.getParentDetails(event.node)
    //alert('fff');
    //}
  }

  viewLetter() {

    let letterArray: number[] = [];
    for (let t = 0; t < this.selectedLetter.length; t++) {
      if (this.selectedLetter[t].data.WL_RecID != 0) {
        letterArray.push(this.selectedLetter[t].data.WL_RecID);
      }
    }
    this.poService.viewLetter(letterArray).subscribe(

      (response: HttpResponse<Blob>) => {
        console.log(response.headers.get('content-disposition'));
        let x = response.headers.get('content-disposition');
        if (x === null) return;

        let filename = (x).split(';')[1].split('=')[1].toString();

        this.file = response.body;
        const blob: Blob = new Blob([this.file], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      }
  
    );

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
      data => { this.letterTemplates = data; }
    );
    /*
    
        this.items = [
          { label: 'View letter', icon: 'pi pi-fw pi-search', command: () => this.viewLetter(this.selectedLetter) },
          { label: 'Delete letter', icon: 'pi pi-fw pi-times', command: () => this.deleteLetter(this.selectedLetter) }
        ];
        */

    this.cols = [
      { field: "name", header: "FullName", icon: "icon" }
      //{ field: "size", header: "Size" },
      //{ field: "type", header: "Type" }
    ];

  }


  expandNodes(nodes: any) {
    for (let node of nodes) {
      node.expanded = true;
    }
    this.files = [...this.files];
  }

  collapseNodes(nodes: any) {
    for (let node of nodes) {
      node.expanded = false;
    }
    this.files = [...this.files];
  }





}
