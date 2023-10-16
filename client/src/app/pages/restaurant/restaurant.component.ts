import { Component, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
    selector: 'app-restaurant',
    styleUrls: ['./restaurant.component.scss'],
    template: `
        <div class="wrapper">
            <div class="restaurant-img">
                <img src="https://resizer.otstatic.com/v2/photos/wide-huge/3/51669570.webp" alt="restaurant-image" />
                <app-button class="save-btn">
                    <ng-icon class="save-icon" name="ionBookmarkOutline" />
                    <span>Save this restaurant</span>
                </app-button>
            </div>

            <div class="content">
                <app-restaurant-main />
                <app-restaurant-aside />
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

    constructor(
        private el: ElementRef,
        private route: ActivatedRoute,
        private authSv: AuthService,
        private restaurantSv: RestaurantService,
    ) {
        route.params.subscribe((params) => {
            this.restaurantId = params['id'];
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
}
