import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeTemplate, SelectItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { LookupService } from '../shared/lookup.service';


@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css'],
  providers: [MessageService, ConfirmationService, LookupService]

})
export class NurseComponent implements OnInit {

  nurseDialog: boolean = false;
  nurses: any[] = [];
  selectedNurses: any[] = [];
  nurse: any = '';
  submitted: boolean = false;
  message: any = '';

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private lookupService: LookupService) { }


  openNew() {
    this.nurse = {};
    this.submitted = false;
    this.nurseDialog = true;
  }

  editNurse(nurse: any) {
    this.nurse = { ...nurse };
    this.nurseDialog = true;

  }
  hideDialog() {
    this.nurseDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.nurses.length; i++) {
      if (this.nurses[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  saveNurse() {
    this.submitted = true;

    if (this.submitted && (!this.nurse.NurseTypeName)
    ) {
      return;
    }


    if (this.nurse.NurseTypeName.trim()) {

      this.nurses[this.findIndexById(this.nurse.ID)] = this.nurse;
      this.lookupService.updateNurse(this.nurse).subscribe(
        (data) => {
          this.message = data,
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message, life: 4000 });

          this.lookupService.getLookupValues().subscribe(data => {
            [data].map((name) => {
              this.nurses = JSON.parse(JSON.stringify(name)).nurse;
            })
          });
        },
        (err) => {
          this.message = err.error;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
        });

      this.nurses = [...this.nurses];
      this.nurseDialog = false;
      this.nurse = {};
    }
  }


  deleteNurse(nurse: any) {
    this.nurse = { ...nurse };

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.nurse.NurseTypeName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        this.lookupService.deleteNurse(this.nurse).subscribe(

          (data) => {
            this.message = data,
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message, life: 4000 });

            this.lookupService.getLookupValues().subscribe(data => {
              [data].map((name) => {
                this.nurses = JSON.parse(JSON.stringify(name)).nurse;
              })
            });
          },
          (err) => {
            this.message = err.error;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
          });

      }
    });
  }

  ngOnInit(): void {
    this.lookupService.getLookupValues().subscribe(data => {
      [data].map((name) => {
        this.nurses = JSON.parse(JSON.stringify(name)).nurse;
      })
    });

  }

}
