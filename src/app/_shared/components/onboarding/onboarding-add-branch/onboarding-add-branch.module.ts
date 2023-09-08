import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingAddBranchComponent } from './onboarding-add-branch.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_shared/guards/auth.guard';
import { BranchModule } from '../../branch-management/branch.module';


const routes: Routes = [
  {
    path: 'add-branch',
    component: OnboardingAddBranchComponent,
    canActivate: [AuthGuard],
  }
];
@NgModule({
  declarations: [
    OnboardingAddBranchComponent
  ],
  imports: [
    CommonModule,
    BranchModule,
    RouterModule.forChild(routes)
  ]
})
export class OnboardingAddBranchModule { }
