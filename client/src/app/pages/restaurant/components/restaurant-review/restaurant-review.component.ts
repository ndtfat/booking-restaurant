import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-restaurant-review',
    styleUrls: ['./restaurant-review.component.scss'],
    template: `
        <div class="wrapper">
            <div class="user-info">
                <ng-icon class="icon" name="ionPersonCircleOutline" />
                <p class="username">ndtfat</p>
            </div>
            <div class="review-content">
                <p class="date">August 26, 2023</p>
                <div class="rate">
                    <p><span>Overall</span> 4</p>
                    <p><span>Food</span> 5</p>
                    <p><span>Service</span> 4</p>
                    <p><span>Ambience</span> 5</p>
                </div>

                <p #content class="content">Garlic chiccken and salads are so yummy!!</p>
                <div *ngIf="showReadMoreButton">
                    <span *ngIf="!moreContent" class="more-btn" (click)="onToggleShowContent()">Show more</span>
                    <span *ngIf="moreContent" class="more-btn" (click)="onToggleShowContent()">Show less</span>
                </div>
            </div>
        </div>
    `,
})
export class RestaurantReviewComponent implements AfterViewInit {
    @ViewChild('content') contentRef!: ElementRef;
    moreContent: boolean = false;
    showReadMoreButton: boolean = false;

    constructor() {}

    ngAfterViewInit(): void {
        const contentHeight = this.contentRef.nativeElement.clientHeight;

        if (contentHeight > 60) {
            this.contentRef.nativeElement.classList.add('ellipsis');
            this.showReadMoreButton = true;
        }
    }

    onToggleShowContent() {
        this.moreContent = !this.moreContent;
        this.contentRef.nativeElement.classList.toggle('ellipsis');
    }
}
