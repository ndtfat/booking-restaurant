import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `
        <button
            [class]="primary ? 'wrapper--primary' : 'wrapper'"
            (click)="onCLickButton()"
        >
            <ng-content />
        </button>
    `,
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() click!: () => any | void;
    @Input() primary!: boolean;

    onCLickButton() {
        this.click();
    }
}
