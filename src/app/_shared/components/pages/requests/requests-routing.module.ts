import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductRequestsComponent } from './product-requests/product-requests.component';
import { PetsRequestsComponent } from './pets-requests/pets-requests.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductRequestsComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_View]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'pets',
    component: PetsRequestsComponent,
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
export class RequestsRoutingModule { }
