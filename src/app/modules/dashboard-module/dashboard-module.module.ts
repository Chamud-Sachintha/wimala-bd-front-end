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
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateEntityComponent } from './dialogs/update-entity/update-entity.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CreateStockComponent } from './admin/create-stock/create-stock.component';

@NgModule({
  declarations: [
    HomeComponent,
    MemberRegistrationComponent,
    StockManagementComponent,
    ProductionManagementComponent,
    LineManagementComponent,
    SalaryMenegemntComponent,
    ReportsComponent,
    UpdateEntityComponent,
    FilterPipe,
    CreateStockComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [DecimalPipe],
  entryComponents: [UpdateEntityComponent]
})
export class DashboardModuleModule { }
