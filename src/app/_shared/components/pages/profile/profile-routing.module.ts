import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

{
  path: '',
  component: ProfileComponent,
  // data: {
  //   preload: true,
  //   permissions: [AppPermissions.LAB_MACHINE_View]
  // },
  // canActivate: [AuthGuard],
  // canDeactivate: [CanDeactivateGuard]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
