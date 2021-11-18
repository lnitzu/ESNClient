import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';



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
      { label: 'Current list', icon: 'pi pi-fw pi-folder-open', routerLink: ['/crtlist'], queryParams: { 'recent': 'true' } },
      { label: 'Letters', icon: 'pi pi-fw pi-file' ,routerLink: ['/letters']},
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog',
    
      items: [
        {label: 'Data', icon: 'pi pi-cloud-download', routerLink: ['/settings']},
        {label: 'Schools', icon: 'pi pi-fw pi-refresh', routerLink: ['/schools']},
        {label: 'Nurses', icon: 'pi pi-fw pi-refresh', routerLink: ['/nurses']}
    ]
    },

      
      
    ];



  }



}
