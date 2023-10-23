import { Component, ElementRef, Input } from '@angular/core';
import Restaurant from 'src/app/_share/models/Restaurant';

@Component({
    selector: 'app-restaurant-main',
    templateUrl: './restaurant-main.component.html',
    styleUrls: ['./restaurant-main.component.scss'],
})
export class RestaurantMainComponent {
    @Input() restaurant!: Restaurant;
    @Input() price!: number[];

    constructor(private el: ElementRef) {}

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
