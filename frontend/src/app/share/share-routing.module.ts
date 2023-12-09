import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HrHomeComponent } from '../hr/hr-home/hr-home.component';
import { OnboardingApplicationComponent } from '../components/employees/onboarding-application/onboarding-application.component';


const shareRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'hr-home', component: HrHomeComponent },
  { path: 'employee', component: OnboardingApplicationComponent}
  // { path: 'visa-status', component: VisaStatusManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(shareRoutes)],
  exports: [RouterModule]
})
export class ShareRoutingModule { }