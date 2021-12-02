import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

import { UserIdentityService } from '../shared/user-identity.service';

import { ConfirmationService, PrimeTemplate, SelectItem } from 'primeng/api';
import { ExchangeService } from '../shared/exchange.service';




import { TreeNode } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';

import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [DataService, MessageService, ConfirmationService]

})
export class SettingsComponent implements OnInit {




  constructor(private datafeed: DataService,
    private userService: UserIdentityService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }


  ready: boolean = true;
  postings: TreeNode[] = [];
  user: any;
  checked: boolean = true;
  resetDialog: boolean = false;
  file: any = [];
  /*
    showConfirm() {
      this.messageService.clear();
      this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'This will reset all data!'});
    }
    onConfirm() {
      this.archiveCurrentSet();
      this.messageService.clear('c');
    }
    onReject() {
      this.messageService.clear('c');
    }
  */

  hideDialog() {
    this.resetDialog = false;

  }

  reset() {
    this.resetDialog = true;
  }


  resetData() {
    if (this.checked == true) {
      this.export2Excel();
      //generate the  letters and archive them in a zip
    }
    this.resetDialog = false;
    this.datafeed.archiveIntake(this.user.Username).toPromise().then
      (
        data => {

          this.postings = <TreeNode[]>data.postTree;
        }
      ).catch(

      );
  }


  archiveCurrentSet() {


    this.export2Excel();
    this.datafeed.archiveIntake(this.user.Username).toPromise().then
      (
        data => {

          this.postings = <TreeNode[]>data.postTree;
        }
      ).catch(

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
        // console.log(resp.headers.get('content-disposition'));
        let x = resp.headers.get('content-disposition');
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

  }



  ngOnInit(): void {
    this.getBatchList();
    this.userService.getUser().subscribe(data => { this.user = data; })
  }

}
