import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { LineManagementComponent } from './admin/line-management/line-management.component';
import { MemberRegistrationComponent } from './admin/member-registration/member-registration.component';
import { ProductionManagementComponent } from './admin/production-management/production-management.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { SalaryMenegemntComponent } from './admin/salary-menegemnt/salary-menegemnt.component';
import { StockManagementComponent } from './admin/stock-management/stock-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        component: HomeComponent
      },
      {
        path: 'admin/registration',
        component: MemberRegistrationComponent
      },
      {
        path: 'admin/stock-management',
        component: StockManagementComponent
      },
      {
        path: 'admin/production-management',
        component: ProductionManagementComponent
      },
      {
        path: 'admin/line-management',
        component: LineManagementComponent
      },
      {
        path: 'admin/salary-management',
        component: SalaryMenegemntComponent
      },
      {
        path: 'admin/reports',
        component: ReportsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
