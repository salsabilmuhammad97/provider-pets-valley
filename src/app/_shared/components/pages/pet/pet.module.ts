import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetRoutingModule } from './pet-routing.module';
import { PetAddComponent } from './pet-add/pet-add.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    PetAddComponent,
    PetListComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ToastModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    MultiSelectModule,
    TableModule,
    CalendarModule,
    InputSwitchModule,
    InputNumberModule,
    ProgressSpinnerModule
  ]
})
export class PetModule { }
