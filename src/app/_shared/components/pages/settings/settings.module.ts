import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { SettingsRoutingModule } from './settings-routing.module';


@NgModule({
  declarations: [
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ],
  bootstrap: [TermsConditionsComponent]
})
export class SettingsModule { }
