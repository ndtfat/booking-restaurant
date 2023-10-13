import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.scss'],
    template: `
        <div #header class="wrapper">
            <span class="logo-wrapper" (click)="goHomePage()">
                <img alt="logo-image" src="../../../assets/logo.png" class="logo-image" />
                <h1 *ngIf="!isSrcoll" class="name">ReserveBites</h1>
            </span>

            <div *ngIf="!isSrcoll && !logIned" class="button-wrapper">
                <app-button [link]="'/register-restaurant'">Register My Restaurant</app-button>
                <app-button [primary]="true" [link]="'/auth/login'">Log In</app-button>
            </div>

            <app-search-bar *ngIf="isSrcoll" />

            <span *ngIf="isSrcoll || logIned" class="logo-wrapper menu">
                <ng-icon class="icon" name="ionPersonCircleOutline" />
                <ul *ngIf="!logIned">
                    <li [routerLink]="'/auth/login'"><a>Log in</a></li>
                    <li [routerLink]="'/register-restaurant'">Register my restaurant</li>
                </ul>
            </span>
        </div>
    `,
})
export class HeaderComponent implements OnInit, OnDestroy {
    logIned: boolean;
    isSrcoll: boolean = false;
    @ViewChild('header') header!: ElementRef<HTMLDivElement>;

    constructor(private router: Router, private authSv: AuthService) {
        this.logIned = !!authSv.user;
    }

    ngOnInit() {
        window.addEventListener('scroll', this.scrollEvent, true);
    }

    scrollEvent = (event: any): void => {
        const n = event.srcElement.scrollingElement.scrollTop;
        this.header.nativeElement.style.background = `rgba(255,255,255, ${n / 226})`;

        this.isSrcoll = n >= 226;
    };

    goHomePage() {
        this.router.navigateByUrl('/');
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.scrollEvent, true);
    }
}
