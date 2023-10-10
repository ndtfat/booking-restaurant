import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIconsModule } from '@ng-icons/core';
import {
    ionLogoGoogle,
    ionEyeOutline,
    ionEyeOffOutline,
    ionSearchOutline,
    ionMailOutline,
    ionLocationOutline,
    ionLockClosedOutline,
    ionCloseCircleOutline,
    ionPersonCircleOutline,
    ionLogoFacebook,
    ionPersonOutline,
    ionPhonePortraitSharp,
    ionCloudUploadOutline,
} from '@ng-icons/ionicons';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { SearchComponent } from './pages/home/components/search/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';
import { OwnerInfoComponent } from './pages/register-restaurant/components/owner-info/owner-info.component';
import { RestaurantInfoComponent } from './pages/register-restaurant/components/restaurant-info/restaurant-info.component';
import { RegisterProcessComponent } from './pages/register-restaurant/components/register-process/register-process.component';
import { environment } from 'src/environments/environment';

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
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
