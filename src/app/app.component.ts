import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employment Student Nurses';

 
 
  items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {label: 'Current list', icon: 'pi pi-fw pi-home', routerLink: ['/crtlist'], queryParams: {'recent': 'true'}},
            {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
            {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
            {label: 'Documentation', icon: 'pi pi-fw pi-file'},
            {label: 'Settings', icon: 'pi pi-fw pi-cog'}
        ];
    }
  


}
