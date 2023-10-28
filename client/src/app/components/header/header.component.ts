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
                <p *ngIf="!isSrcoll" class="name">ReserveBites</p>
            </span>

            <div *ngIf="!isSrcoll && !logIned" class="button-wrapper">
                <app-button [primary]="true" [link]="'/register-restaurant'">Register My Restaurant</app-button>
                <app-button [primary]="true" [link]="'/auth/login'">Log In</app-button>
            </div>

            <app-search-bar *ngIf="isSrcoll" />

            <span *ngIf="isSrcoll || logIned" class="logo-wrapper menu">
                <ng-icon class="icon" name="ionPersonCircleOutline" />
                <ul *ngIf="!logIned">
                    <li [routerLink]="'/auth/login'">Log in</li>
                    <li [routerLink]="'/register-restaurant'">Register my restaurant</li>
                </ul>
                <ul *ngIf="logIned">
                    <li [routerLink]="'/user/profile'">My profile</li>
                    <li [routerLink]="'/user/history'">My history</li>
                    <li [routerLink]="'/user/saved-restaurant'">My saved restaurant</li>
                    <li (click)="onSignOut()">Sign out</li>
                </ul>
            </span>
        </div>
    `,
})
export class HeaderComponent implements OnInit, OnDestroy {
    logIned: boolean;
    isSrcoll: boolean = false;

    constructor(private router: Router, private authSv: AuthService) {
        this.logIned = !!authSv.user;
    }

    ngOnInit() {
        window.addEventListener('scroll', this.scrollEvent, true);
    }

    scrollEvent = (event: any): void => {
        const n = event.srcElement.scrollingElement.scrollTop;
        this.isSrcoll = n >= 226;
    };

    goHomePage() {
        this.router.navigateByUrl('/');
    }

    onSignOut() {
        this.authSv.signOut();
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.scrollEvent, true);
    }
}
