import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Review from 'src/app/_share/models/Review';

@Component({
    selector: 'app-restaurant-review-form',
    styleUrls: ['./restaurant-review-form.component.scss'],
    template: `
        <form [formGroup]="formReview">
            <div class="rate">
                <p>Rate restaurant (1 ~ 5)</p>

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
                <p>Write your opinion</p>
                <textarea rows="3" placeholder="Write your opinion here..." formControlName="content"></textarea>
            </div>
            <app-button class="submit-btn" [primary]="true" (click)="onSubmit()">Rate restaurant</app-button>
        </form>
    `,
})
export class RestaurantReviewFormComponent {
    @Output() userReview = new EventEmitter();
    restaurantId!: string;

    constructor(private route: ActivatedRoute, private restaurantSv: RestaurantService, private snackBar: MatSnackBar) {
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

            this.restaurantSv.review(payload, this.restaurantId)?.subscribe((res) => {
                this.userReview.emit(res.data);
                this.snackBar.open('You reviewed restaurant', 'OK');
            });
        } else {
            this.snackBar.open('Something is missing or invalid', 'Check');
        }
    }
}
