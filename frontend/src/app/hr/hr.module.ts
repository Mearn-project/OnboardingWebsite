import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from "@angular/forms";

import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { NavigationComponent } from './navigation/navigation.component';

import { HttpClientModule } from '@angular/common/http';
import { HrRoutingModule } from './hr-routing.module';

import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    NavigationComponent,
    VisaStatusManagementComponent,
  ],
  imports: [
    HrRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    // StoreModule.forFeature(auth: loginReducer)
  ],
  exports: [
  ]
})
export class HrModule { }
