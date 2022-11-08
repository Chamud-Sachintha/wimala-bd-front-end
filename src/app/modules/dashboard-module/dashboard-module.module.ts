import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './admin/home/home.component';
import { MemberRegistrationComponent } from './admin/member-registration/member-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StockManagementComponent } from './admin/stock-management/stock-management.component';

@NgModule({
  declarations: [
    HomeComponent,
    MemberRegistrationComponent,
    StockManagementComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DecimalPipe],
})
export class DashboardModuleModule { }
