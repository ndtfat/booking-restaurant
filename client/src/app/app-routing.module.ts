import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'auth/:type', component: AuthComponent },
    { path: 'register-restaurant', component: RegisterRestaurantComponent },
    { path: 'restaurant/:id', component: RestaurantComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
