import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutayComponent } from './layouts/auth-layoutay/auth-layoutay.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutayComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./modules/auth-module/auth-module.module").then((m) => m.AuthModuleModule)
      }
    ],
    // canActivate: [SessionCheckGuardGuard]
  },

  {
    path: 'app',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("./modules/dashboard-module/dashboard-module.module").then((m) => m.DashboardModuleModule)
      }
    ],
    // canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
