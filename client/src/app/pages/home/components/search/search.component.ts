import { Component } from '@angular/core';

@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.scss'],
    template: `
        <div class="wrapper">
            <h1 class="title">Find your restaurant</h1>
            <app-search-bar (searchTextChanged)="inputChange($event)" />
        </div>
    `,
})
export class SearchComponent {
    inputChange(e: string) {
        console.log(e);
    }
}
