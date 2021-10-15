import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdcarouselComponent } from './adcarousel.component';

describe('AdcarouselComponent', () => {
  let component: AdcarouselComponent;
  let fixture: ComponentFixture<AdcarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdcarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
