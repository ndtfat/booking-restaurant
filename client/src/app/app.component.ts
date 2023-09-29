import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-header />
        <router-outlet />
    `,
})
export class AppComponent {}
