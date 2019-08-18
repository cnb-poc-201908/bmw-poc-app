import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PackMaintenancePage } from './pack-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: PackMaintenancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PackMaintenancePage]
})
export class PackMaintenancePageModule {}
