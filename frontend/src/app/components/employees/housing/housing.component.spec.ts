import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingComponent } from './housing.component';

describe('HousingComponent', () => {
  let component: HousingComponent;
  let fixture: ComponentFixture<HousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
