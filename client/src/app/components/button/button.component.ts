import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-button',
    template: `
        <button
            #button
            [class]="primary ? 'wrapper--primary' : 'wrapper'"
            (click)="onCLickButton()"
            [style.color]="color ? '#fff' : ''"
            [style.backgroundColor]="color"
        >
            <ng-content />
        </button>
    `,
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() link!: string;
    @Input() click!: () => any | void;
    @Input() primary!: boolean;
    @Input() color!: string;

    @ViewChild('button') button!: ElementRef;

    constructor(private router: Router) {}

    onCLickButton() {
        if (this.click) {
            this.click();
        }

        if (this.link) {
            this.router.navigate([this.link]);
        }
    }
}
