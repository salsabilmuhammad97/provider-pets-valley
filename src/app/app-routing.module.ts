import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './_shared/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './_shared/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
            { path: 'onboarding', loadChildren: () => import('./_shared/components/onboarding/onboarding-add-branch/onboarding-add-branch.module').then(m => m.OnboardingAddBranchModule), canLoad: [AuthGuard] },
            { path: 'auth', loadChildren: () => import('./_shared/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'home', component: AppLayoutComponent, canLoad: [AuthGuard], loadChildren: () => import('./_shared/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'pages', component: AppLayoutComponent, loadChildren: () => import('./_shared/components/pages/pages.module').then(m => m.PagesModule), canLoad: [AuthGuard] },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
