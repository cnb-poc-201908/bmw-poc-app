import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  // { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  // { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  // { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'packages', loadChildren: './pages/packages/packages.module#PackagesPageModule' },
  { path: 'virecle-list', loadChildren: './pages/virecle-list/virecle-list.module#VirecleListPageModule' },
  { path: 'search-filter', loadChildren: './pages/modal/search-filter/search-filter.module#SearchFilterPageModule' },
  { path: 'pack-maintenance', loadChildren: './pages/pack-maintenance/pack-maintenance.module#PackMaintenancePageModule' },
  { path: 'pack-check', loadChildren: './pages/pack-check/pack-check.module#PackCheckPageModule' },
  { path: 'pack-accident', loadChildren: './pages/pack-accident/pack-accident.module#PackAccidentPageModule' },
  { path: 'pack-etc', loadChildren: './pages/pack-etc/pack-etc.module#PackEtcPageModule' },
  { path: '**', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'pack-campain', loadChildren: './pack-campain/pack-campain.module#PackCampainPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
