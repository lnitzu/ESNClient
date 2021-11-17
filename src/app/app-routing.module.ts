import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdcarouselComponent } from './adcarousel/adcarousel.component';
import { StudentComponent } from './student/student.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  
  {path:'', component:AdcarouselComponent} , 
  {path:'crtlist', component:StudentComponent},
  {path:'settings', component:SettingsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
