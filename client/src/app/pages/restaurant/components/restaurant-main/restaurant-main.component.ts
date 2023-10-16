import { Component, ElementRef } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
    selector: 'app-restaurant-main',
    templateUrl: './restaurant-main.component.html',
    styleUrls: ['./restaurant-main.component.scss'],
})
export class RestaurantMainComponent {
    constructor(private el: ElementRef, private restaurantSv: RestaurantService) {}

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

    onFilterChange(filterOption: string) {
        console.log(filterOption);
    }
}
