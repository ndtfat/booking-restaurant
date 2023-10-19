import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIconsModule } from '@ng-icons/core';
import {
    ionBookmarkOutline,
    ionChatboxOutline,
    ionCloseCircleOutline,
    ionCloudUploadOutline,
    ionEyeOffOutline,
    ionEyeOutline,
    ionLocationOutline,
    ionLockClosedOutline,
    ionLogoFacebook,
    ionLogoGoogle,
    ionMailOutline,
    ionPersonCircleOutline,
    ionPersonOutline,
    ionPhonePortraitSharp,
    ionSearchOutline,
    ionChevronForward,
    ionTimeOutline,
} from '@ng-icons/ionicons';

import { circumForkKnife, circumMoneyBill, circumChat1, circumMoneyCheck1 } from '@ng-icons/circum-icons';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SearchComponent } from './pages/home/components/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { OwnerInfoComponent } from './pages/register-restaurant/components/owner-info/owner-info.component';
import { RegisterProcessComponent } from './pages/register-restaurant/components/register-process/register-process.component';
import { RestaurantInfoComponent } from './pages/register-restaurant/components/restaurant-info/restaurant-info.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { RestaurantAsideComponent } from './pages/restaurant/components/restaurant-aside/restaurant-aside.component';
import { RestaurantMainComponent } from './pages/restaurant/components/restaurant-main/restaurant-main.component';
import { RestaurantReviewComponent } from './pages/restaurant/components/restaurant-review/restaurant-review.component';
import { RestaurantReviewFormComponent } from './pages/restaurant/components/restaurant-review-form/restaurant-review-form.component';
import { RefeshTokenInterceptor } from './_helpers/interceptors/refesh-token.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AuthComponent,
        HeaderComponent,
        SearchComponent,
        ButtonComponent,
        RestaurantComponent,
        SearchBarComponent,
        RegisterRestaurantComponent,
        OwnerInfoComponent,
        RestaurantInfoComponent,
        RegisterProcessComponent,
        DropDownComponent,
        RestaurantAsideComponent,
        RestaurantMainComponent,
        RestaurantReviewComponent,
        RestaurantReviewFormComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyBwpH__WQWqimTOj4V7hcjnG_LVgCnU26k',
            authDomain: 'booking-restaurant-c51f5.firebaseapp.com',
            projectId: 'booking-restaurant-c51f5',
            storageBucket: 'booking-restaurant-c51f5.appspot.com',
            messagingSenderId: '557628299403',
            appId: '1:557628299403:web:b0ae505395600a917e1c8e',
            measurementId: 'G-V2H2BGBJE6',
        }),
        AngularFireStorageModule,
        NgIconsModule.withIcons({
            ionLogoGoogle,
            ionLogoFacebook,
            ionEyeOutline,
            ionEyeOffOutline,
            ionMailOutline,
            ionSearchOutline,
            ionLocationOutline,
            ionLockClosedOutline,
            ionCloseCircleOutline,
            ionPersonCircleOutline,
            ionPersonOutline,
            ionPhonePortraitSharp,
            ionCloudUploadOutline,
            ionBookmarkOutline,
            circumForkKnife,
            circumMoneyBill,
            circumChat1,
            ionChevronForward,
            ionTimeOutline,
            circumMoneyCheck1,
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefeshTokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
