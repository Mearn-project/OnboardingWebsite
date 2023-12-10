import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';

import { HrHomeComponent } from './hr-home/hr-home.component';
import { EmployeeProfilesComponent } from './employee-profiles/employee-profiles.component';
import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { HiringManagementComponent } from './hiring-management/hiring-management.component';
import { HousingManagementComponent } from './housing-management/housing-management.component';
import { HouseSummaryModalComponent } from './house-summary-modal/house-summary-modal.component';
import { AddHouseModalComponent } from './add-house-modal/add-house-modal.component';

import { NavigationComponent } from './navigation/navigation.component';

import { HttpClientModule } from '@angular/common/http';
import { HrRoutingModule } from './hr-routing.module';


import { StoreModule } from '@ngrx/store';
import { TokenModalComponent } from './token-modal/token-modal.component';
import { ApplicationModalComponent } from './application-modal/application-modal.component';


@NgModule({
  declarations: [
    NavigationComponent,
    EmployeeProfilesComponent,
    VisaStatusManagementComponent,
    HiringManagementComponent,
    HousingManagementComponent,
    HrHomeComponent,
    TokenModalComponent,
    ApplicationModalComponent,
    HouseSummaryModalComponent,
    AddHouseModalComponent
  ],
  imports: [
    HrRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule
        // StoreModule.forFeature(auth: loginReducer)
  ],
  exports: [
  ]
})
export class HrModule { }
