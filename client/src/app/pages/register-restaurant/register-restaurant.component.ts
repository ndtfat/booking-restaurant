import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register-restaurant',
    styleUrls: ['./register-restaurant.component.scss'],
    template: `
        <div class="wrapper">
            <app-register-process [step]="step" />
            <h1 class="title">{{ step === 1 ? 'Your profile' : 'Your restaurant' }}</h1>
            <app-owner-info *ngIf="step === 1" (clickNextStep)="onCLickNextStep($event)" [(ownerInfo)]="ownerInfo" />
            <app-restaurant-info
                *ngIf="step === 2"
                (clickBack)="onClickBack()"
                (clickDone)="onClickDone($event)"
                [(restaurantInfo)]="restaurantInfo"
            />
        </div>
    `,
})
export class RegisterRestaurantComponent {
    step: number = 1;
    ownerInfo = {
        username: '',
        email: '',
        password: '',
    };
    restaurantInfo = {
        name: '',
        phoneNumber: '',
        address: '',
        photo: null,
        menu: [{ name: '', items: [] }],
        openTime: '',
        closeTime: '',
        reservationSize: '',
    };

    constructor(private snackBar: MatSnackBar, private authService: AuthService) {}

    onChangeStep(step: number, isValid?: boolean) {
        if (this.step === 1) {
            if (!this.ownerInfo.email || !this.ownerInfo.username || !this.ownerInfo.password) {
                this.snackBar.open('Please fill all fields', 'OK');
            } else if (!isValid) {
                this.snackBar.open('Some information is invalid', 'Check');
            } else this.step = step;
        } else {
            this.step = step;
        }
    }

    onCLickNextStep(isValid: boolean) {
        this.onChangeStep(2, isValid);
    }

    onClickBack() {
        this.onChangeStep(1);
    }

    onClickDone(isValid: boolean) {
        if (
            !this.restaurantInfo.name ||
            !this.restaurantInfo.photo ||
            !this.restaurantInfo.address ||
            !this.restaurantInfo.openTime ||
            !this.restaurantInfo.closeTime ||
            !this.restaurantInfo.phoneNumber ||
            !this.restaurantInfo.menu
        )
            this.snackBar.open('Please fill all fields', 'OK');
        else if (!isValid) this.snackBar.open('Some infomation is invalid', 'Check');
        else this.authService.registerRestaurant({ ownerInfo: this.ownerInfo, restaurantInfo: this.restaurantInfo });
    }
}
