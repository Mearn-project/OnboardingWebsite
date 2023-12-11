import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { HrModule } from './hr/hr.module';
import { loginReducer } from './store/login.reducer';
import { LoginEffects } from './store/login.effects';
import { reducer } from './store/housing.reducer';

import { HousingEffects } from './store/housing.effects';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './share/share.module';

import { EmployeeModule } from './modules/employee/employee.module';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HrModule,
    SharedModule,
    StoreModule.forRoot({ auth: loginReducer, houses: reducer }),
    EffectsModule.forRoot([LoginEffects, HousingEffects]),
    RouterModule,
    EmployeeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
