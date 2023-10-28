import { Component } from '@angular/core';

@Component({
    selector: 'app-loader',
    styleUrls: ['./loader.component.scss'],
    template: `
        <div class="wrapper">
            <div class="loader"></div>
            <div class="line"></div>
        </div>
    `,
})
export class LoaderComponent {}
