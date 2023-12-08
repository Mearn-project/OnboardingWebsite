import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingApplicationComponent } from '../../components/employees/onboarding-application/onboarding-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalInformationComponent } from '../../components/employees/personal-information/personal-information.component';
import { RegistrationComponent } from '../../components/employees/registration/registration.component';
import { AppMaterialModule } from '../app.material/app.material.module';
import { HousingComponent } from '../../components/employees/housing/housing.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    OnboardingApplicationComponent,
    PersonalInformationComponent,
    RegistrationComponent,
    HousingComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AppMaterialModule, HttpClientModule],
  exports: [
    OnboardingApplicationComponent,
    PersonalInformationComponent,
    RegistrationComponent,
    HousingComponent,
  ],
})
export class EmployeeModule {}
