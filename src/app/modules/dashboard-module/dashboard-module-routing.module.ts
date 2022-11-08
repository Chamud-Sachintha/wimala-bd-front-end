import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { MemberRegistrationComponent } from './admin/member-registration/member-registration.component';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
