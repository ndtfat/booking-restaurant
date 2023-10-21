import { Component } from '@angular/core';

@Component({
    selector: 'app-restaurant-card',
    styleUrls: ['./restaurant-card.component.scss'],
    template: `
        <div class="wrapper">
            <img src="https://resizer.otstatic.com/v2/photos/wide-huge/3/51669570.webp" alt="restaurant-img" />
            <div class="content">
                <p class="location">Thu Duc city</p>
                <div class="name">
                    <p>La Sen</p>
                    <span class="rate">4.5</span>
                </div>
                <p class="operation-tiome">8:00 AM ~ 12:00 PM</p>
                <p class="price">Price: {{ 10 | currency }} ~ {{ 40 | currency }}</p>
                <p class="size">2 ~ 10 people</p>
            </div>
        </div>
    `,
})
export class RestaurantCardComponent {}
