import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Restaurant from 'src/app/_share/models/Restaurant';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
        <div class="wrapper">
            <app-search />
            <div class="body">
                <div>
                    <p class="title">Restaurant for you</p>
                    <ul class="restaurant-list">
                        <li *ngFor="let restaurant of suggestRestaurants">
                            <a [routerLink]="'/restaurant/' + restaurant._id"
                                ><app-restaurant-card [restaurant]="restaurant"
                            /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
})
export class HomeComponent {
    suggestRestaurants!: Restaurant[];

    constructor(private authService: AuthService, private restaurantSv: RestaurantService) {
        this.restaurantSv.getSuggestRestaurants().subscribe((res) => {
            this.suggestRestaurants = res.data;
        });
    }
}
