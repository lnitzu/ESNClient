import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeTemplate, SelectItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { LookupService } from '../shared/lookup.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css'],
  providers: [MessageService, ConfirmationService, LookupService] 
})


export class SchoolComponent implements OnInit {

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    
    private lookupService: LookupService) { }

  ngOnInit(): void {
    this.lookupService.getLookupValues().subscribe(data => {
      [data].map((name) => {
        
        this.schools = JSON.parse(JSON.stringify(name)).school;
        this.schools.push({ID:null, SchoolName:''})

        
      })
    });    
  }


  schoolDialog: boolean = false;
  schools: any[]=[];
  school: any='';
  selectedSchools: any[]=[];
  submitted: boolean=false;

 
  openNew() {
    this.school = {};
    this.submitted = false;
    this.schoolDialog = true;
}



deleteSelectedSchools() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.schools = this.schools.filter(val => !this.selectedSchools.includes(val));
          this.selectedSchools = [];
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}

editSchool(product: any) {
  this.school = {...product};
  this.schoolDialog = true;
}



deleteSchool(product: any) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.schools = this.schools.filter(val => val.id !== this.school.id);
          this.school = {};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}


hideDialog() {
  this.schoolDialog = false;
  this.submitted = false;
}


saveSchool() {
  this.submitted = true;

  if (this.school.SchoolName.trim()) {
      if (this.school.ID) {
          this.schools[this.findIndexById(this.school.ID)] = this.school;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
          this.school.id = this.createId();
          
          this.schools.push(this.school);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.schools = [...this.schools];
      this.schoolDialog = false;
      this.school = {};
  }
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

createId(): string {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}




}
