import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import Restaurant from 'src/app/_share/models/Restaurant';

@Component({
    selector: 'app-restaurant',
    styleUrls: ['./restaurant.component.scss'],
    template: `
        <app-loader *ngIf="!restaurantInfo" />
        <div *ngIf="restaurantInfo" class="wrapper">
            <div class="restaurant-img">
                <img [src]="restaurantInfo.photos[0]" alt="restaurant-image" />
                <app-button [primary]="true" class="save-btn" (click)="onSaveRestaurant()">
                    <ng-icon class="save-icon" name="ionBookmarkOutline" />
                    <span>Save this restaurant</span>
                </app-button>
            </div>

            <div class="content">
                <app-restaurant-main [restaurant]="restaurantInfo" [price]="price" />
                <app-restaurant-aside [restaurant]="restaurantInfo" />
            </div>
        </div>
    `,
})
export class RestaurantComponent {
    bookingForm: FormGroup = new FormGroup({
        numberOfGuests: new FormControl('', { validators: [Validators.required] }),
        date: new FormControl('', { validators: [Validators.required] }),
        time: new FormControl('', { validators: [Validators.required] }),
    });
    restaurantId!: string;
    restaurantInfo!: Restaurant;
    price: number[] = [Infinity, -Infinity];

    constructor(
        private el: ElementRef,
        private route: ActivatedRoute,
        private authSv: AuthService,
        private userSv: UserService,
        private restaurantSv: RestaurantService,
    ) {
        route.params.subscribe((params) => {
            this.restaurantId = params['id'];
        });

        restaurantSv.getRestaurantById(this.restaurantId).subscribe((res) => {
            this.restaurantInfo = res.data;
            this.restaurantInfo.menu.forEach((category) => {
                category.items.forEach((item) => {
                    if (item.price < this.price[0]) {
                        this.price[0] = item.price;
                    }
                    if (item.price > this.price[1]) {
                        this.price[1] = item.price;
                    }
                });
            });
        });
    }

    onScrollToSection(sectionId: string) {
        const section = this.el.nativeElement.querySelector(`#${sectionId}`);
        const headerOffset = 150;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }

    onBooking() {
        if (this.bookingForm.valid) {
            if (this.authSv.user)
                this.restaurantSv.booking(
                    { ...this.bookingForm.value, clientId: this.authSv.user?.id },
                    this.restaurantId,
                );
        }
    }

    onSaveRestaurant() {
        this.userSv.saveRestaurant(this.restaurantId);
    }
}
