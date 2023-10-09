import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-register-process',
    styleUrls: ['./register-process.component.scss'],
    template: `
        <div class="wrapper">
            <div class="step">
                <span [class]="step === 2 ? 'done' : ''">1</span>
                <p class="step-title">Your profile</p>
            </div>

            <span [class]="step === 2 ? 'line done' : 'line'"></span>

            <div class="step">
                <span [class]="step === 3 ? 'done' : ''">2</span>
                <p class="step-title">Your restaurant</p>
            </div>
        </div>
    `,
})
export class RegisterProcessComponent {
    @Input() step: number = 2;
}
