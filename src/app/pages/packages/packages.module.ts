import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PackagesPage } from './packages.page';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CheckComponent } from './check/check.component';
import { AccidentComponent } from './accident/accident.component';
import { EtcComponent } from './etc/etc.component';

const routes: Routes = [
  {
    path: '',
    component: PackagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PackagesPage, MaintenanceComponent, CheckComponent, AccidentComponent, EtcComponent]
})
export class PackagesPageModule {}
