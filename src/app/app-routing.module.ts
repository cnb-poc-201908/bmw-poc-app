import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'app/', loadChildren: './pages/login/login.module#LoginPageModule' },
  // { path: 'app/about', loadChildren: './pages/about/about.module#AboutPageModule' },
  // { path: 'app/settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  // { path: 'app/edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'app/home-results', loadChildren: './pages/home-results/home-results.module#HomeResultsPageModule' },
  { path: 'app/packages', loadChildren: './pages/packages/packages.module#PackagesPageModule' },
  { path: 'app/virecle-list', loadChildren: './pages/virecle-list/virecle-list.module#VirecleListPageModule' },
  { path: 'app/search-filter', loadChildren: './pages/modal/search-filter/search-filter.module#SearchFilterPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
