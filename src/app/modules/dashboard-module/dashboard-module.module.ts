import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { HomeComponent } from './admin/home/home.component';
import { MemberRegistrationComponent } from './admin/member-registration/member-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    MemberRegistrationComponent
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
