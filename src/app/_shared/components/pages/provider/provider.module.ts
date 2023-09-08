import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderDetailsComponent } from './provider-details/provider-details.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    ProviderListComponent,
    ProviderDetailsComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    InputSwitchModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class ProviderModule { }
