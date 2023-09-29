import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { SearchComponent } from './pages/home/components/search/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgIconsModule } from '@ng-icons/core';
import {
    ionLocationOutline,
    ionSearchOutline,
    ionCloseCircleOutline,
    ionPersonCircleOutline,
} from '@ng-icons/ionicons';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        ButtonComponent,
        RestaurantComponent,
        SearchComponent,
        SearchBarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        NgIconsModule.withIcons({
            ionLocationOutline,
            ionSearchOutline,
            ionCloseCircleOutline,
            ionPersonCircleOutline,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
