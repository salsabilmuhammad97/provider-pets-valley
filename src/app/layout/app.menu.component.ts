import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from './service/app.layout.service';
import { AuthService, STORAGE_KEY_USER_ID } from '../_shared/service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private router: Router, private route: ActivatedRoute, public authService: AuthService) { }

    onItemClick(item: any) {

        if (item.command) item.command();
    }

    ngOnInit() {

        this.model = [
            {
                label: '',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] }
                ]
            },
            {
                label: 'Services',
                items: [
                    { label: 'Add Service', icon: 'pi pi-plus', routerLink: ['/pages/service/add'] },
                    { label: 'Service list', icon: 'pi pi-fw pi-bars', routerLink: ['/pages/service/list'] },
                ]
            },
            {
                label: 'Product',
                items: [
                    { label: 'Add Product', icon: 'pi pi-plus', routerLink: ['/pages/product/add'] },
                    { label: 'Product list', icon: 'pi pi-fw pi-list', routerLink: ['/pages/product/list'] },
                ]
            },
            {
                label: 'Pets',
                items: [
                    { label: 'Add Pet', icon: 'pi pi-plus', routerLink: ['/pages/pet/add'] },
                    { label: 'Pet list', icon: 'pi pi-fw pi-list', routerLink: ['/pages/pet/list'] },
                ]
            },
            {
                label: 'Requests',
                icon: 'request-icon',
                items: [
                    { label: 'Products', icon: 'pi pi-fw pi-list', routerLink: ['/pages/requests/products'] },
                    { label: 'Pets', icon: 'pi pi-th-large', routerLink: ['/pages/requests/pets'] }
                ]
            },
            {
                label: 'Manage Profile',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/pages/profile'],
                separator: true,
                command: () => this.router.navigate(['/pages/profile']),
                cursor: 'pointer'
            },
            {
                label: 'Setting',
                icon: 'pi pi-fw pi-cog',
                separator: true,
                command: () => this.router.navigate(['/pages/settings']),
                cursor: 'pointer'
            },
            {
                label: 'Rate',
                icon: 'pi pi-fw pi-star',
                items: [
                    { label: 'Add Rate', icon: 'pi pi-plus', routerLink: ['/pages/rating/add'] },
                    { label: 'rating list', icon: 'pi pi-fw pi-list', routerLink: ['/pages/rating/list'] },
                ]
            },
            {
                label: 'logout',
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.authService.logout(),
                cursor: 'pointer',
            },
        ];
    }
}
