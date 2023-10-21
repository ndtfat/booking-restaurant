import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `
        <app-header *ngIf="isHaveHeader" />
        <div [ngStyle]="{ marginTop: isHaveHeader ? '90px' : '0px' }"></div>
        <router-outlet />
    `,
})
export class AppComponent {
    isHaveHeader: boolean = false;

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isHaveHeader = !(event.url.includes('auth') || event.url.includes('register-restaurant'));
            }
        });
    }
}
