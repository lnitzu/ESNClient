import { Component, Injectable, OnInit, Input } from '@angular/core';


import { StudentService } from '../shared/student.service';
import { ConfirmationService, PrimeTemplate, SelectItem } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';



import { Observable } from "rxjs/";

import { LookupService } from '../shared/lookup.service';
//import { ISchool } from '../ischool'; } from '../ischool';

import { INurse } from '../inurse';
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

  nurses: any[] = [];
  schools: any[] = [];


  studentDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];
  first: number = 0;

  maxHours: number = 0;

  message: any = '';


  leftLimit(): number { return Math.floor(this.cols.length / 2) + 1; }
  rightLimit(): number { return Math.floor(this.cols.length / 2); }




  constructor(
    private service: StudentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private lookupService: LookupService) {



  }



  ngOnInit(): void {

    this.service.getStudentList().subscribe(data => {
      this.students = data;

    }


    );
    this.lookupService.getLookupValues().subscribe(data => {
      [data].map((name) => {

        this.nurses = JSON.parse(JSON.stringify(name)).nurse;
        this.nurses.push({ ID: null, NurseTyeName: '' });
        this.schools = JSON.parse(JSON.stringify(name)).school;
        this.schools.push({ ID: null, SchoolName: '' })
        console.log(this.schools);

      })
    });

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


  getSchoolName(item: number): string {

    let x = this.schools.find(i => i.ID === item);
    if (x != null)
      return x.SchoolName;
    return '';

  }


  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }

  editStudent(_student: any) {
    this.student = { ..._student };

    //calendar control needs proper date
    if (this.student.HireStartDate != null) this.student.HireStartDate = new Date(this.student.HireStartDate);
    if (this.student.FundingDate != null) this.student.FundingDate = new Date(this.student.FundingDate);
    if (this.student.PostingDate != null) this.student.PostingDate = new Date(this.student.PostingDate);
    if (this.student.AppliedDate != null) this.student.AppliedDate = new Date(this.student.AppliedDate);
    if (this.student.HiringFairDate != null) this.student.HiringFairDate = new Date(this.student.HiringFairDate);

    this.doMaxHours();
    this.studentDialog = true;
  }



  saveStudent() {
    this.submitted = true;

    if (this.student.FullName.trim()) {
      if (this.student.ApplicantID) {
        this.students[this.findIndexById(this.student.ApplicantID)] = this.student;
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Updated', life: 3000 });
      }
      else {

        //this.students.push(this.student);
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }



      //save
      this.service.updateStudent(this.student).subscribe(

        (data) => {
          this.message = data,
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message, life: 4000 });
          this.students = [...this.students];
        },
        (err) => {
          this.message = err.error;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
        });

      this.studentDialog = false;
      this.student = {};



    }
  }


  deleteStudent(_student: any) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + _student.FullName + '?',
      header: 'Confirm student delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        this.service.deleteStudent(_student).subscribe(

          (data) => {
            this.message = data,
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.message, life: 4000 });
            this.students = this.students.filter(val => val.ApplicantID !== _student.ApplicantID);
          },
          (err) => {
            this.message = err.error;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message.Message, life: 4000 });
          });



        //this.student = {};
        //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Student Deleted', life: 4000 });
      }
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].ApplicantID === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  doMaxHours() {
    this.maxHours = 0;
    if (this.student.FundingDate >= this.student.HireStartDate) {
      let fdate = this.student.FundingDate;
      let hdate = this.student.HireStartDate;
      if (fdate != null && hdate != null) {
        let d = Math.floor((Date.UTC(fdate.getFullYear(), fdate.getMonth(), fdate.getDate()) -
          Date.UTC(hdate.getFullYear(), hdate.getMonth(), hdate.getDate())) / (1000 * 60 * 60 * 24));
        this.maxHours = d;
      }
    }
  }


}
