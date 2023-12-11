import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './hiring-management/hiring-management.component';
import { HousingManagementComponent } from './housing-management/housing-management.component';
import { HrHomeComponent } from './hr-home/hr-home.component';

import { NavigationComponent } from './navigation/navigation.component';
import { HrGuard } from '../hr.guard';


const hrRoutes: Routes = [
  { path: 'visa-status', component: VisaStatusManagementComponent, canActivate: [HrGuard] },
  { path: 'hr-home', component: HrHomeComponent, canActivate: [HrGuard] },
  { path: 'employee-profiles', component: EmployeeProfilesComponent, canActivate: [HrGuard] },
  { path: 'visa-status-management', component: VisaStatusManagementComponent, canActivate: [HrGuard] },
  { path: 'hiring-management', component: HiringManagementComponent, canActivate: [HrGuard] },
  { path: 'housing-management', component: HousingManagementComponent, canActivate: [HrGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(hrRoutes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }