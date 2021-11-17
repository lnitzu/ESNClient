import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

import { UserIdentityService } from '../shared/user-identity.service';


import { ExchangeService } from '../shared/exchange.service';


import {TreeNode} from 'primeng/api';
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
  postings: TreeNode[]=[];
  user: any;

  resp: any[]=[];

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
        this.postings =<TreeNode[]> data.postTree;
      }
    );

  }

  export2Excel(){

    this.datafeed.export2Excel().subscribe(
      d=>{
        this.resp = d
        let when = new Date();
        let dataType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        let binaryData = [];
        binaryData.push(d);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {
           type: dataType
        }));
        downloadLink.download ='StudentList' + when.toLocaleString()+ '.xlsx';
        document.body.appendChild(downloadLink);
        downloadLink.click();   
        URL.revokeObjectURL(downloadLink.href);     

      }
      )
      

  }

 

  ngOnInit(): void {
    this.getBatchList();
    this.userService.getUser().subscribe(data => { this.user = data; })
  }

}
