import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

import { UserIdentityService } from '../shared/user-identity.service';


import { ExchangeService } from '../shared/exchange.service';


import { TreeNode } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [DataService]

})
export class SettingsComponent implements OnInit {




  constructor(private datafeed: DataService, private userService: UserIdentityService) { }


  ready: boolean = true;
  postings: TreeNode[] = [];
  user: any;

  file: any=[];

  setAsCurrentSet() {


    //this.ready = false;
    /* this.datafeed.setCrtIntake(this.selected).subscribe
       (
         data => {
           
           //this.batchList = data.batch;
         }
 
       );
 */
  }


  archiveCurrentSet() {


    //this.ready = false;
    this.datafeed.archiveIntake(this.user.Username).subscribe
      (
        data => {

          this.postings = <TreeNode[]>data.postTree;
        }

      );

  }

  mergeData() {

    this.ready = false;
    this.datafeed.updateIntake(this.user.Username).subscribe
      (
        data => {
          this.ready = data.resp;
          this.postings = <TreeNode[]>data.postTree;
        }

      );


  }

  getBatchList() {
    this.datafeed.getBatchList().subscribe(
      data => {
        this.postings = <TreeNode[]>data.postTree;
      }
    );

  }

  export2Excel() {


    this.datafeed.downloadLink().subscribe(
      (resp: HttpResponse<Blob>) => {
        console.log(resp.headers.get('content-disposition'));
        let  x = resp.headers.get('content-disposition');
        if (x === null) return;

        let filename = (x).split(';')[1].split('=')[1].toString();
        
        

        this.file = resp.body;
        const blob: Blob = new Blob([this.file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        

        a.href = objectUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);

      });
/*
    this.datafeed.export2Excel().subscribe(
      (data )=> {

        //var contentDisposition = data.headers.get('content-disposition');
        const blob: Blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const fileName: string = 'my-test.xlsx';
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);

      }

    )
*/

  }



  ngOnInit(): void {
    this.getBatchList();
    this.userService.getUser().subscribe(data => { this.user = data; })
  }

}
