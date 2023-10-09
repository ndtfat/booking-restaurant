import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterRestaurantComponent } from './pages/register-restaurant/register-restaurant.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'auth/:type', component: AuthComponent },
    { path: 'register-restaurant', component: RegisterRestaurantComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
