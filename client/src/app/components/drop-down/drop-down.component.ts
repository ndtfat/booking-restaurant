import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-drop-down',
    styleUrls: ['./drop-down.component.scss'],
    template: `
        <div class="wrapper">
            <div [ngClass]="isOpen ? 'open' : ''" (click)="onShowItems()">
                <ng-icon class="icon" name="ionChevronForward" />
                <span>{{ name }}</span>
            </div>
            <ul *ngIf="items" [style.max-height.px]="isOpen ? getMaxHeight() : '0'">
                <li *ngFor="let item of items">
                    {{ item.name }} <span>{{ item.price | currency }}</span>
                </li>
            </ul>
        </div>
    `,
})
export class DropDownComponent {
    @Input() name!: string;
    @Input() items!: any[];

    isOpen: boolean = false;

    onShowItems() {
        this.isOpen = !this.isOpen;
    }

    // Calculate the maximum height based on the number of items
    getMaxHeight(): number {
        // Adjust this value as needed
        const itemHeight = 40; // Change this to match your item's height
        return this.items.length * itemHeight;
    }
}
