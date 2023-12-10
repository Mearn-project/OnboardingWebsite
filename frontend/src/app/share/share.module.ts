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
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from './login/login.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

import { HttpClientModule } from '@angular/common/http';
import { ShareRoutingModule } from './share-routing.module';

import { loginReducer } from '../store/login.reducer';
import { LoginEffects } from '../store/login.effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    LoginComponent,
    DialogContentComponent
  ],
  imports: [
    ShareRoutingModule,
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
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
    DialogContentComponent,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
    ]
})
export class SharedModule { }
