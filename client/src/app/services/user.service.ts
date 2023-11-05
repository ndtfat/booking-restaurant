import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import User from '../_share/models/User';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private authSv: AuthService, private _snackbar: MatSnackBar) {}

    saveRestaurant(restaurantId: string) {
        if (this.authSv.checkLogedIn()) return;

        this.http
            .post<{ message: string; savedRestaurants: string[] }>(environment.SERVER_URL + '/user/save-restaurant', {
                userId: this.authSv.user?.id,
                restaurantId,
            })
            .subscribe((res) => {
                const user = this.authSv.user;
                if (user) {
                    user.savedRestaurants = res.savedRestaurants;
                    this.authSv.setUser(user);
                }
                this._snackbar.open('You save this restaurant', 'OK');
            });
    }

    unsaveRestaurant(restaurantId: string) {
        if (this.authSv.checkLogedIn()) return;

        this.http
            .post<{ message: string; savedRestaurants: string[] }>(environment.SERVER_URL + '/user/unsave-restaurant', {
                userId: this.authSv.user?.id,
                restaurantId,
            })
            .subscribe((res) => {
                const user = this.authSv.user;
                if (user) {
                    user.savedRestaurants = res.savedRestaurants;
                    this.authSv.setUser(user);
                }
                this._snackbar.open('You unsave this restaurant', 'OK');
            });
    }
}
