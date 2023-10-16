import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
    selector: 'app-restaurant-review-form',
    styleUrls: ['./restaurant-review-form.component.scss'],
    template: `
        <form [formGroup]="formReview">
            <div class="rate">
                <p>Your rate (1 ~ 5)</p>

                <div>
                    <div class="input">
                        <label for="food">Food:</label>
                        <input min="1" max="5" id="food" type="number" formControlName="food" />
                    </div>
                    <div class="input">
                        <label for="service">Service:</label>
                        <input min="1" max="5" id="service" type="number" formControlName="service" />
                    </div>
                    <div class="input">
                        <label for="ambience">Ambience:</label>
                        <input min="1" max="5" id="ambience" type="number" formControlName="ambience" />
                    </div>
                </div>
            </div>

            <div class="content">
                <p>Your opinion</p>
                <textarea rows="3" placeholder="Write your opinion here..." formControlName="content"></textarea>
            </div>
            <app-button class="submit-btn" [primary]="true" (click)="onSubmit()">Rate restaurant</app-button>
        </form>
    `,
})
export class RestaurantReviewFormComponent {
    restaurantId!: string;

    constructor(private route: ActivatedRoute, private restaurantSv: RestaurantService) {
        route.params.subscribe((params) => {
            this.restaurantId = params['id'];
        });
    }

    formReview: FormGroup = new FormGroup({
        food: new FormControl('', { validators: [Validators.required, Validators.min(1), Validators.max(5)] }),
        content: new FormControl('', { validators: [Validators.required] }),
        service: new FormControl('', { validators: [Validators.required, Validators.min(1), Validators.max(5)] }),
        ambience: new FormControl('', { validators: [Validators.required, Validators.min(1), Validators.max(5)] }),
    });

    onSubmit() {
        if (this.formReview.valid) {
            const payload = {
                rate: {
                    food: Number(this.formReview.value.food),
                    service: Number(this.formReview.value.service),
                    ambience: Number(this.formReview.value.ambience),
                },
                content: this.formReview.value.content,
            };

            this.restaurantSv.review(payload, this.restaurantId);
        }
    }
}
