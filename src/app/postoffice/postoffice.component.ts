import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { PostofficeService } from '../shared/postoffice.service';
import { LetterService } from '../shared/letter.service';
import { Message, MessageService } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { HttpResponse } from '@angular/common/http';


declare var $: any;

@Component({
  selector: 'app-postoffice',
  templateUrl: './postoffice.component.html',
  styleUrls: ['./postoffice.component.css']
})
export class PostofficeComponent implements OnInit {




  private connection: any;
  private proxy: any;
  public serverMsg: any = '';
  statusNum: number = 0;



  public init() {


    let url = 'http://localhost:1229';
    this.connection = $.hubConnection(url);
    this.proxy = this.connection.createHubProxy('SignalHub');

    this.proxy.on('Hello', (data: any) => {
      var y: number = +data;
      console.log(y);
      //console.log(this.selectedCandidates.length);
      if (this.letterArray.length > 0)
        this.statusNum = Math.round(100 * y / (this.letterArray.length));
      //this.statusNum = Math.round(y);

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

  viewProgress: boolean = false;

  letterArray: number[] = [];
  viewSpinner: boolean = false;

  @ViewChild('tt', { read: '', static: true }) dt: any;

  items: MenuItem[] = [];

  selectedLetter: TreeNode[] = [];

  multiselectedLetters: any[] = [];

  letterTemplates: any[] = [];

  file: any = [];
  files: TreeNode[] = [];

  message: any = '';
  selectedNode: any[] = [];
  cols: any[] = [];

  constructor(private poService: PostofficeService, private letterService: LetterService,
    private messageService: MessageService

  ) { }



  nodeSelect(event: any) {
    this.selectedLetter = event;
  }


  emailLetter() {

    //this.viewSpinner = true;
    this.viewProgress= true;
    var startTime = performance.now();
    //let letterArray: number[] = [];
    for (let t = 0; t < this.selectedLetter.length; t++) {
      if (this.selectedLetter[t].data.WL_RecID != 0) {
        this.letterArray.push(this.selectedLetter[t].data.WL_RecID);
      }
    }
    this.poService.emailLetter(this.letterArray).subscribe(
      data => {

        //this.viewSpinner = false;
        this.viewProgress= false
        var endTime = performance.now();
      });

  }

  viewLetter() {


    this.message = (this.selectedLetter.length - 1).toString() + " letters were concatenated in ";
    this.viewSpinner = true;
    
    var startTime = performance.now();
    let letterArray: number[] = [];
    for (let t = 0; t < this.selectedLetter.length; t++) {
      if (this.selectedLetter[t].data.WL_RecID != 0) {
        letterArray.push(this.selectedLetter[t].data.WL_RecID);
      }
    }
    this.poService.viewLetter(letterArray).subscribe(


      (response: HttpResponse<Blob>) => {
        //console.log(response.headers.get('content-disposition'));
        console.log(response);
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
        this.viewSpinner = false;
        var endTime = performance.now();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message + ' in ' + (Math.round((endTime - startTime) / 1000)).toString() + ' sec.', life: 4000 });
        this.viewSpinner = false;
      }

    );


  }

  deleteLetter(id: any) {

  }
  ngOnInit(): void {

    this.viewSpinner = true;
    //get the applicants with letters
    this.poService.getLetters().subscribe(

      data => {
        this.files = <TreeNode[]>data;
        //console.log(this.files);
        this.viewSpinner = false;
      }

    );


    this.letterService.getLetterTemplates().subscribe(
      data => { this.letterTemplates = data; }
    );


    this.cols = [
      { field: "name", header: "Applicant Name", icon: "icon" }
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
