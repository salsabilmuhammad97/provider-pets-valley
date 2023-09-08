import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { ProviderListComponent } from './provider-list/provider-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'view/:id',
    component: ProviderDetailsComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_Edit]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'list',
    component: ProviderListComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_View]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
