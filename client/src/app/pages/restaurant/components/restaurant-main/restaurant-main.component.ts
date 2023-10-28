import { Component, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Restaurant from 'src/app/_share/models/Restaurant';
import Review from 'src/app/_share/models/Review';

@Component({
    selector: 'app-restaurant-main',
    templateUrl: './restaurant-main.component.html',
    styleUrls: ['./restaurant-main.component.scss'],
})
export class RestaurantMainComponent {
    @Input() restaurant!: Restaurant;
    @Input() price!: number[];
    isLogedin!: boolean;
    yourReview: Review | undefined;
    reviews!: Review[];

    constructor(private el: ElementRef, private authSv: AuthService, private restairantSv: RestaurantService) {
        this.isLogedin = !!authSv.user;
    }

    ngAfterViewInit() {
        if (this.restaurant)
            this.restairantSv.getReview(this.restaurant._id).subscribe((res) => {
                this.reviews = res.data.reviews;
                this.yourReview = res.data.yourReview;
                console.log(this.yourReview);
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

    onFilterChange(filterOption: string) {
        console.log(filterOption);
    }

    onUserReview(reviewData: Review) {
        this.yourReview = reviewData;
    }
}
