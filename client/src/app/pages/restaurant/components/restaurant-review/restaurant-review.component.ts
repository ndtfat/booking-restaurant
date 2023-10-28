import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import Review from 'src/app/_share/models/Review';

@Component({
    selector: 'app-restaurant-review',
    styleUrls: ['./restaurant-review.component.scss'],
    template: `
        <div *ngIf="reviewData" class="wrapper">
            <div class="user-info">
                <ng-icon class="icon" name="ionPersonCircleOutline" />
                <p class="username">{{ reviewData.clientId.username }}</p>
            </div>
            <div class="review-content">
                <p class="date">{{ reviewData.createdAt | date : 'dd/MM/yyyy' }}</p>
                <div class="rate">
                    <p>
                        <span>Overall</span>
                        {{
                            ((reviewData.rate.food + reviewData.rate.service + reviewData.rate.ambience) / 3).toFixed(1)
                        }}
                    </p>
                    <p><span>Food</span> {{ reviewData.rate.food }}</p>
                    <p><span>Service</span> {{ reviewData.rate.service }}</p>
                    <p><span>Ambience</span> {{ reviewData.rate.ambience }}</p>
                </div>

                <p #content class="content">{{ reviewData.content }}</p>
                <div *ngIf="showReadMoreButton">
                    <span *ngIf="!moreContent" class="more-btn" (click)="onToggleShowContent()">Show more</span>
                    <span *ngIf="moreContent" class="more-btn" (click)="onToggleShowContent()">Show less</span>
                </div>
            </div>
        </div>
    `,
})
export class RestaurantReviewComponent implements AfterViewInit {
    @Input() reviewData!: Review;
    @ViewChild('content') contentRef!: ElementRef;
    moreContent: boolean = false;
    showReadMoreButton: boolean = false;

    constructor() {
        console.log(this.reviewData);
    }

    ngAfterViewInit(): void {
        if (this.contentRef) {
            const contentHeight = this.contentRef.nativeElement.clientHeight;

            if (contentHeight > 60) {
                this.contentRef.nativeElement.classList.add('ellipsis');
                this.showReadMoreButton = true;
            }
        }
    }

    onToggleShowContent() {
        this.moreContent = !this.moreContent;
        this.contentRef.nativeElement.classList.toggle('ellipsis');
    }
}
