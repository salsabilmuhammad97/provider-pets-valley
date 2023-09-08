import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'service', loadChildren: () => import('./service/service.module').then(m => m.ServiceModule) },
        { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
        { path: 'pet', loadChildren: () => import('./pet/pet.module').then(m => m.PetModule) },
        { path: 'provider', loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule) },
        { path: 'requests', loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule) },
        { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
        { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
        { path: 'rating', loadChildren: () => import('./rating/rating.module').then(m => m.RateModule) },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
