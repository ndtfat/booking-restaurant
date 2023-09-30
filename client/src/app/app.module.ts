import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

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
    ],
    imports: [
        FormsModule,
        RouterModule.forRoot([]),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
