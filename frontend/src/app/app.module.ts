import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VisaStatusManagementComponent } from './components/visa-status-management/visa-status-management.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NavigationComponent,
    VisaStatusManagementComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
})
export class AppModule { }
