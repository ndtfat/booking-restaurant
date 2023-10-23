import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Restaurant from 'src/app/_share/models/Restaurant';

@Component({
    selector: 'app-restaurant-aside',
    templateUrl: './restaurant-aside.component.html',
    styleUrls: ['./restaurant-aside.component.scss'],
})
export class RestaurantAsideComponent {
    @Input() restaurant!: Restaurant;

    bookingForm: FormGroup = new FormGroup({
        numberOfGuests: new FormControl('', { validators: [Validators.required] }),
        date: new FormControl('', { validators: [Validators.required] }),
        time: new FormControl('', { validators: [Validators.required] }),
    });
    restaurantId!: string;

    constructor(private route: ActivatedRoute, private snackbar: MatSnackBar, private restaurantSv: RestaurantService) {
        route.params.subscribe((params) => {
            this.restaurantId = params['id'];
        });
    }

    onBooking() {
        if (this.bookingForm.valid) {
            this.restaurantSv.booking({ ...this.bookingForm.value }, this.restaurantId);
        } else {
            this.snackbar.open('You missing some information', 'Check', { duration: 4000 });
        }
    }
}
