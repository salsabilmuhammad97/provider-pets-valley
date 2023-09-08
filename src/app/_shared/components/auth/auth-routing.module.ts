import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'signup', component: SignupComponent },
        { path: 'otp/:phone', component: OtpComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
