import { Component, Input } from '@angular/core';
import Restaurant from 'src/app/_share/models/Restaurant';

@Component({
    selector: 'app-restaurant-card',
    styleUrls: ['./restaurant-card.component.scss'],
    template: `
        <div class="wrapper">
            <img [src]="restaurant.photos[0]" alt="restaurant-img" />
            <div class="content">
                <p class="location">{{ restaurant.address }}</p>
                <div class="name">
                    <p>{{ restaurant.name }}</p>
                    <span class="rate">{{ restaurant.rate }}</span>
                </div>
                <p class="operation-tiome">{{ restaurant.openTime }} ~ {{ restaurant.closeTime }}</p>
                <p class="price">Price: {{ 10 | currency }} ~ {{ 40 | currency }}</p>
                <p class="size">1 ~ {{ restaurant.reservationSize }} people</p>
            </div>
        </div>
    `,
})
export class RestaurantCardComponent {
    @Input() restaurant!: Restaurant;
}
