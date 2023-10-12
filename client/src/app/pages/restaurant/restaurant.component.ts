import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent {
    bookingForm: FormGroup = new FormGroup({
        size: new FormControl('', { validators: [Validators.required] }),
        date: new FormControl('', { validators: [Validators.required] }),
        time: new FormControl('', { validators: [Validators.required] }),
    });

    constructor(private el: ElementRef) {}

    onScrollToSection(sectionId: string) {
        const section = this.el.nativeElement.querySelector(`#${sectionId}`);
        const headerOffset = 152;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }

    onBooking() {
        if (this.bookingForm.valid) {
            console.log(this.bookingForm.value);
        }
    }
}
