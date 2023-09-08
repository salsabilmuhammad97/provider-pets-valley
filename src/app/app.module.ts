import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './_shared/components/notfound/notfound.component';
import { ProductService } from './_shared/service/product.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ErrorInterceptor } from './_shared/interceptors/error.interceptor';
import { AuthInterceptor } from './_shared/interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy }, ProductService, MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
