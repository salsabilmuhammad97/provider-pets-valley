import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { RateAddComponent } from './rate-add/rate-add.component';
import { RateListComponent } from './rate-list/rate-list.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';

@NgModule({
  declarations: [
    RateAddComponent,
    RateListComponent
  ],
  imports: [
    CommonModule,
    RatingRoutingModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    InputTextModule,
    ButtonModule,
    ChartModule,
    DividerModule
  ]
})
export class RateModule { }
