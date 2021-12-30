import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeTemplate, SelectItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { LookupService } from '../shared/lookup.service';


import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
  providers: [MessageService, ConfirmationService, LookupService]
})


export class SchoolComponent implements OnInit {


  schoolForm!: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private lookupService: LookupService) { 
      this.schoolForm = this.fb.group({
        postalcode: ['', Validators.required ]
        });
    }

  ngOnInit(): void {
    this.lookupService.getLookupValues().subscribe(data => {
      [data].map((name) => {
        this.schools = JSON.parse(JSON.stringify(name)).school;
      })
    });
  



    this.schoolForm = this.fb.group({
      postalcode: ['', Validators.required]
     });

  }



  schoolDialog: boolean = false;
  schools: any[] = [];
  school: any = '';
  selectedSchools: any[] = [];
  submitted: boolean = false;
  message: any = '';

  

  openNew() {
    this.school = {};
    this.submitted = false;
    this.schoolDialog = true;
  }

  editSchool(school: any) {
    this.school = { ...school };
    this.schoolDialog = true;

  }



  deleteSchool(school: any) {
    this.school = { ...school };

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.school.SchoolName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        
        this.lookupService.deleteSchool(this.school).subscribe(

          (data) => {
            this.message = data,
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message, life: 4000 });

            this.lookupService.getLookupValues().subscribe(data => {
              [data].map((name) => {
                this.schools = JSON.parse(JSON.stringify(name)).school;
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


  hideDialog() {
    this.schoolDialog = false;
    this.submitted = false;
  }


  saveSchool() {
    this.submitted = true;

  if (this.submitted && ( !this.school.PostalCode || !this.school.City || !this.school.SchoolName
    || !this.school.PrimaryEmail || !this.school.SecondaryEmail || !this.school.ContactPerson)
    )
  {
    return;
  }


    if ( this.school.SchoolName.trim()) {
     
        this.schools[this.findIndexById(this.school.ID)] = this.school;
        this.lookupService.updateSchool(this.school).subscribe(
          (data) => {
            this.message = data,
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message, life: 4000 });

            this.lookupService.getLookupValues().subscribe(data => {
              [data].map((name) => {
                this.schools = JSON.parse(JSON.stringify(name)).school;
              })
            });
          },
          (err) => {
            this.message = err.error;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
          });
      
      this.schools = [...this.schools];
      this.schoolDialog = false;
      this.school = {};
    }
  }

isEmptyObject(obj:any) {
    return !Object.keys(obj).length;
}


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.schools.length; i++) {
      if (this.schools[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

}
