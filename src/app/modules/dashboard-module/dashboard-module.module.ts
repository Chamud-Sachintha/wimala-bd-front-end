import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './admin/home/home.component';
import { MemberRegistrationComponent } from './admin/member-registration/member-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StockManagementComponent } from './admin/stock-management/stock-management.component';
import { ProductionManagementComponent } from './admin/production-management/production-management.component';
import { LineManagementComponent } from './admin/line-management/line-management.component';
import { SalaryMenegemntComponent } from './admin/salary-menegemnt/salary-menegemnt.component';
import { ReportsComponent } from './admin/reports/reports.component';

@NgModule({
  declarations: [
    HomeComponent,
    MemberRegistrationComponent,
    StockManagementComponent,
    ProductionManagementComponent,
    LineManagementComponent,
    SalaryMenegemntComponent,
    ReportsComponent
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
