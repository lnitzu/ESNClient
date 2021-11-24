import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdcarouselComponent } from './adcarousel/adcarousel.component';
import { StudentComponent } from './student/student.component';
import { SettingsComponent } from './settings/settings.component';
import { LetterComponent } from './letter/letter.component';
import { PostofficeComponent } from './postoffice/postoffice.component';

const routes: Routes = [
  
  {path:'', component:AdcarouselComponent} , 
  {path:'crtlist', component:StudentComponent},
  {path:'letter', component:LetterComponent},
  {path:'settings', component:SettingsComponent},
  {path:'postoffice', component:PostofficeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
