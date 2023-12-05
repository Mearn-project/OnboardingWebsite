import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingApplicationComponent } from './onboarding-application.component';

describe('OnboardingApplicationComponent', () => {
  let component: OnboardingApplicationComponent;
  let fixture: ComponentFixture<OnboardingApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
