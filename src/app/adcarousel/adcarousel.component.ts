import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adcarousel',
  templateUrl: './adcarousel.component.html',
  styleUrls: ['./adcarousel.component.css']
})
export class AdcarouselComponent implements OnInit {

  images: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.images = [
      {src: "assets/carousel/3b91b5e5-bf2d-4d72-ad27-82551febac81_Neonatal-intensive-care-unit.jpg"},
       {src:"assets/carousel/4dea1b15-a6b2-456b-842f-7f1d808c908d_children_nicu_tn.jpg"},
       {src:"assets/carousel/06e65b79-ad89-46e9-8404-76aff3b1f63c_87507102.jpg"},
       {src:"assets/carousel/09ec5ca1-79c0-4ba7-a7dc-ab9a7ffabbc4_ICU-1.jpg"}

       
    ];

  }

}
