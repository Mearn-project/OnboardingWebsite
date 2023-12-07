import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingManagementComponent } from './housing-management.component';

describe('HousingManagementComponent', () => {
  let component: HousingManagementComponent;
  let fixture: ComponentFixture<HousingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HousingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
