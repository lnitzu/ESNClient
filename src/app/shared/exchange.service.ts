import { Injectable } from '@angular/core';


import { UserComponent } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
 
  public user!: UserComponent;

  constructor() { }
}
