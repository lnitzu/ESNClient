import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdcarouselComponent } from './adcarousel/adcarousel.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  
  {path:'', component:AdcarouselComponent} , 
  {path:'crtlist', component:StudentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
