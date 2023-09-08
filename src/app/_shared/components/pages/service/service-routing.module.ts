import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddServiceComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_Create]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'edit/:id',
    component: AddServiceComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_Edit]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'list',
    component: ServiceListComponent,
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
export class ServiceRoutingModule { }
