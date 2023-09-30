import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
        <app-header *ngIf="!isAuthPage" />
        <router-outlet />
    `,
})
export class AppComponent {
    isAuthPage: boolean = false;

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isAuthPage = event.url.includes('auth');
            }
        });
    }
}
