import { Component, OnInit } from '@angular/core';
import { UserIdentityService } from '../shared/user-identity.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] ,
  providers: []
})
export class UserComponent implements OnInit {

  usrData: any;
  constructor(private service: UserIdentityService) {this.usrData = new Object(); }

  ngOnInit(): void {
    this.service.getUser().subscribe(data=>{this.usrData=data;})
  }

}
