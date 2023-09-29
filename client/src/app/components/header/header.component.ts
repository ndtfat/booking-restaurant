import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    template: `
        <div #header class="wrapper">
            <span class="logo-wrapper">
                <img
                    alt="logo-image"
                    src="../../../assets/logo.png"
                    class="logo-image"
                />
                <h1 *ngIf="!isScoll" class="name">ReserveBites</h1>
            </span>

            <div *ngIf="!isScoll" class="button-wrapper">
                <app-button>REGISTER</app-button>
                <app-button [primary]="true">LOG IN</app-button>
            </div>

            <app-search-bar *ngIf="isScoll" />

            <span *ngIf="isScoll" class="logo-wrapper">
                <ng-icon class="icon" name="ionPersonCircleOutline" />
            </span>
        </div>
    `,
})
export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy {
    isScoll: boolean = false;
    @ViewChild('header') header!: ElementRef<HTMLDivElement>;

    ngOnInit() {
        window.addEventListener('scroll', this.scrollEvent, true);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.scrollEvent, true);
    }

    scrollEvent = (event: any): void => {
        const n = event.srcElement.scrollingElement.scrollTop;
        this.header.nativeElement.style.background = `rgba(255,255,255, ${
            n / 226
        })`;

        this.isScoll = n >= 226;
    };

    ngAfterViewInit() {}
}
