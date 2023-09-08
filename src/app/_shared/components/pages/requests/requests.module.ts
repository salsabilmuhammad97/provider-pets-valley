import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProductRequestsComponent } from './product-requests/product-requests.component';
import { PetsRequestsComponent } from './pets-requests/pets-requests.component';


@NgModule({
  declarations: [
    ProductRequestsComponent,
    PetsRequestsComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,


    InputTextModule,
    FormsModule,
    TableModule,
    ButtonModule,



    MultiSelectModule,
    DropdownModule,


    ReactiveFormsModule,
    InputNumberModule,






  ]
})
export class RequestsModule { }
