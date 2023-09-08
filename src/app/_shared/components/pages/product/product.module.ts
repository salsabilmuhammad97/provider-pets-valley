import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
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
    ProductListComponent,
    ProductAddComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CalendarModule,
    InputSwitchModule,
    InputNumberModule,
    ProgressSpinnerModule
  ]
})
export class ProductModule { }
