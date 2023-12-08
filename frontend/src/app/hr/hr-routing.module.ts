import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './hiring-management/hiring-management.component';
import { HousingManagementComponent } from './housing-management/housing-management.component';
import { HrHomeComponent } from './hr-home/hr-home.component';

import { NavigationComponent } from './navigation/navigation.component';


const hrRoutes: Routes = [
  { path: 'visa-status', component: VisaStatusManagementComponent },
  { path: 'hr-home', component: HrHomeComponent },
  { path: 'employee-profiles', component: EmployeeProfilesComponent },
  { path: 'visa-status-management', component: VisaStatusManagementComponent },
  { path: 'hiring-management', component: HiringManagementComponent },
  { path: 'housing-management', component: HousingManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(hrRoutes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }