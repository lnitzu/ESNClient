import { Component, Injectable, OnInit } from '@angular/core';


import { StudentService } from '../shared/student.service';
import { ConfirmationService, PrimeTemplate, SelectItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';



import { Observable } from "rxjs/";

import { LookupService } from '../shared/lookup.service';
//import { ISchool } from '../ischool'; } from '../ischool';

import {INurse} from '../inurse';
import { ILookup } from '../ilookup';
import { ISchool } from '../ischool';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [MessageService, ConfirmationService, LookupService]
})





export class StudentComponent implements OnInit {

  students: any[] = [];
  student: any = {};

  nurses : INurse[]=[];
  schools: ISchool[]=[];


  studentDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  first: number = 0;

  

  SchoolNames = [
    { SchoolID: 1, name: 'My School' },
    { SchoolID: 2, name: 'Black school' },
    { SchoolID: 3, name: 'Gray school' },
    { SchoolID: 4, name: 'Blue school' },
    { SchoolID: 5, name: 'Orange school' },
    { SchoolID: 6, name: 'Yellow school' },
    { SchoolID: null, name:'' }

  ];


  p : Array<any>=[];

SchoolMap =   this.SchoolNames.map((name) => {
    return { label: name.name, x: name.SchoolID }
  });

  constructor(
    private service: StudentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private lookupService : LookupService) { 

    }

    //   <!-- {{SchoolMap.filter(val => val.id == row[col.field] ) }}-->


    getSchoolByID(val:number):any{
      if (val!=null)
      {
        return (this.schools.filter( u=> u.ID ==val)[0]).SchoolName;
      }
    }


    

  ngOnInit(): void {

    this.service.getStudentList().subscribe(data => { this.students = data; });
    this.lookupService.getLookupValues().subscribe(data => { 
      [data].map((name) => {
        //console.log(JSON.parse(JSON.stringify(name)));
        this.nurses = JSON.parse(JSON.stringify(name)).nurse;
        this.schools= JSON.parse(JSON.stringify(name)).school;
        console.log(this.schools);

        


      })
    
    });
    
    
/*
    this.nurses = this.lookupValues.map((valz: any)=>{
        return {'nursa' : valz.Nurse}
    });
*/

      
      
      

  //  console.log(typeof this.lookupValues.nurse);
           




   
  


 
    this.cols = [

      { field: 'ApplicantID', header: 'Applicant ID', tooltip: "Applicant ID", visible: false },
      { field: 'ProfileID', header: 'Profile ID', tooltip: "Profile ID", visible: false },
      { field: 'ProfileType', header: 'Profile type', tooltip: "Profile type (internal/external)", visible: false },
      { field: 'FirstName', header: 'First name', tooltip: "First name of the applicant", visible: false },
      { field: 'LastName', header: 'Last name', tooltip: "Last name of the applicant", visible: false },
      { field: 'FullName', header: 'Applicant', tooltip: "Applicant full name", visible: true },
      { field: 'FHAEmpNo', header: 'FHA Emp#', tooltip: "FHA Employee number", visible: false },
      { field: 'PostingIDNum', header: 'Posting#', tooltip: "Posting number", visible: true },
      { field: 'PostingIDSuffix', header: 'Posting suffix #', tooltip: "Posting sufix", visible: false },
      { field: 'MapToPostingID', header: 'Parent posting#', tooltip: "Parent posting #", visible: false },
      { field: 'PostingDate', header: 'Posting date', tooltip: "Posting date", visible: false },
      { field: 'CostCenter', header: 'Cost center', tooltip: "Cost center", visible: true },
      { field: 'PostingManager', header: 'Posting mngr', tooltip: "Posting manager name", visible: true },
      { field: 'PostingMngrADUsername', header: 'Posting manager AD', tooltip: "AD login of the posting manager", visible: false },
      { field: 'DeptName', header: 'Dpt name', tooltip: "Department name", visible: true },
      { field: "AppliedDate", header: 'Applied date', tooltip: "Application date", visible: false },
      { field: 'ApprovalStatus', header: 'Approval status', tooltip: "Aproval status", visible: false },
      { field: 'City', header: 'City', tooltip: "Applicant city", visible: true },
      { field: 'Address1', header: 'Address', tooltip: "Applicant address", visible: false },
      { field: 'Province', header: 'Province', tooltip: "Applicant province", visible: false },
      { field: 'Country', header: 'Country', tooltip: "Applicant country", visible: false },
      { field: 'PhonePrimary', header: 'Primary phone', tooltip: "Applicant primary phone", visible: false },
      { field: 'PostalCode', header: 'Postal code', tooltip: "Applicant postal code", visible: false },
      { field: 'Email', header: 'Email', tooltip: "Applicant email", visible: false },
      { field: 'InterviewingManager', header: 'Interviewing Manager', tooltip: "InterviewingManager", visible: false },
      { field: 'HiringFairDate', header: 'Hiring Fair Date', tooltip: "Hiring fair date", visible: false },
      { field: 'InterviewTime', header: 'Interview time', tooltip: "Interview time", visible: false },
      { field: 'FairAlternative', header: 'Fair alternative', tooltip: "Fair alternative", visible: false },
      { field: 'OnsiteDeadline', header: 'Onsite Deadline', tooltip: "Onsite Deadline", visible: false },
      { field: 'HireStartDate', header: 'Hire start date', tooltip: "Hire start date - setting this date triggers hire work flow", visible: true },
      { field: 'FundingDate', header: 'Funding date', tooltip: "Funding date", visible: false },
      { field: 'NurseType', header: 'Nurse type', tooltip: "Nurse type", visible: false },
      { field: 'ProgramCompletionDate', header: 'Program completion date', tooltip: "Program completion date", visible: false },
      { field: 'SecondYrCompletiondate', header: 'SecondYrCompletiondate', tooltip: "Second Year completion date", visible: false },
      { field: 'Registration', header: 'Registration', tooltip: "Registration", visible: false },
      { field: 'EduVerificationComplete', header: 'EduVerificationComplete', tooltip: "Education Verification Complete (Y/N)", visible: false },
      { field: 'SchoolID', header: 'School', tooltip: "School name", visible: true },
      { field: 'CPR_Expiry', header: 'CPR expiry date', tooltip: "CPR Expiry date", visible: false },
      { field: 'ModifiedOn', header: 'ModifiedOn', tooltip: "Modified date", visible: false },
      { field: 'ModifiedBy', header: 'ModifiedBy', tooltip: "Modified by", visible: false },
      { field: 'Site', header: 'Facility', tooltip: "Facility", visible: true }



    ];
    this.primengConfig.ripple = true;



  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }

  editStudent(_student: any) {
    this.student = { ..._student };
    this.studentDialog = true;
  }


  saveStudent() {
    this.submitted = true;

    if (this.student.FullName.trim()) {
      if (this.student.ApplicantID) {
        this.students[this.findIndexById(this.student.ApplicantID)] = this.student;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Updated', life: 3000 });
      }
      else {
        //this.student.ApplicantID = this.createId();

        //this.students.push(this.student);
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.students = [...this.students];
      this.studentDialog = false;
      this.student = {};

      //save

    }
  }
  deleteStudent(_student: any) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + _student.FullName + '?',
      header: 'Confirm student delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.students = this.students.filter(val => val.ApplicantID !== _student.ApplicantID);

        //this.student = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Deleted', life: 13000 });
      }
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].ApplicantID === id) {
        index = i;
        break;
      }
    }

    return index;
  }




}
