import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            redirectTo: 'terms-conditions',
            pathMatch: 'full'
        },
        {
            path: 'terms-conditions',
            component: TermsConditionsComponent
        }
    ])],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
