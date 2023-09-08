import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetAddComponent } from './pet-add/pet-add.component';
import { PetListComponent } from './pet-list/pet-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: PetListComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_Create]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'add',
    component: PetAddComponent,
    // data: {
    //   preload: true,
    //   permissions: [AppPermissions.LAB_MACHINE_Create]
    // },
    // canActivate: [AuthGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetRoutingModule { }
