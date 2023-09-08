import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: ProductAddComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_Create]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'edit/:id',
    component: ProductAddComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_Edit]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'list',
    component: ProductListComponent,
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
export class ProductRoutingModule { }
