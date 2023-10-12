import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-drop-down',
    styleUrls: ['./drop-down.component.scss'],
    template: `
        <div class="wrapper">
            <div (click)="onShowItems()">
                <ng-icon [ngClass]="isOpen ? 'icon open' : 'icon'" name="ionChevronForward" />
                <span>{{ name }}</span>
            </div>
            <ul *ngIf="items" [ngClass]="isOpen ? 'open' : ''">
                <li *ngFor="let item of items">{{ item }}</li>
            </ul>
        </div>
    `,
})
export class DropDownComponent {
    @Input() name!: string;
    @Input() items!: string[];

    isOpen: boolean = false;

    onShowItems() {
        this.isOpen = !this.isOpen;
    }
}
