import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchRoutingModule } from './branch-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BranchManagementComponent } from './branch-management.component';

@NgModule({
  declarations: [
    BranchManagementComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  exports: [BranchManagementComponent]
})
export class BranchModule { }
