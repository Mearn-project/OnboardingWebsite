import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HousingComponent } from 'src/app/components/employees/housing/housing.component';
import { OnboardingApplicationComponent } from 'src/app/components/employees/onboarding-application/onboarding-application.component';
import { PersonalInformationComponent } from 'src/app/components/employees/personal-information/personal-information.component';
import { RegistrationComponent } from 'src/app/components/employees/registration/registration.component';
import { EmployeeVisaStatusManagementComponent } from 'src/app/components/employees/visa-status-management/visa-status-management.component';

const routes: Routes = [
  // operational:
  { path: 'register', component: RegistrationComponent },
  { path: 'onboarding-application', component: OnboardingApplicationComponent },
  { path: 'housing', component: HousingComponent },
  // not operational:
  //   { path: 'personal-information', component: PersonalInformationComponent },

  //   {
  //     path: 'employee-visa-status-management',
  //     component: EmployeeVisaStatusManagementComponent,
  //   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
