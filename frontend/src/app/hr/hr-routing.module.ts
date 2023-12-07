import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { NavigationComponent } from './navigation/navigation.component';


const hrRoutes: Routes = [
  // { path: '', component: LoginComponent },
  // { path: 'visa-status', component: VisaStatusManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(hrRoutes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }