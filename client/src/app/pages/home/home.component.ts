import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
                        <li>
                            <a [routerLink]="'/restaurant/1'"><app-restaurant-card /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
})
export class HomeComponent {
    constructor(private authService: AuthService) {}
}
