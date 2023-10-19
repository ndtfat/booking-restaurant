import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Reservation from '../_share/models/Reservation';
import Review from '../_share/models/Review';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class RestaurantService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private authSv: AuthService,
        private snackbar: MatSnackBar,
    ) {}

    checkLogin(): boolean {
        if (!this.authSv.user) {
            this.snackbar.open('Please login first to use this service', 'Login', { duration: 4000 });
            this.router.navigateByUrl('/auth/login');
            return false;
        }
        return true;
    }

    booking(payload: any, restaurantId: string) {
        if (!this.checkLogin()) {
            return;
        }

        const reqBody = {
            ...payload,
            clientId: this.authSv.user?.id,
            restaurantId,
        };

        this.http
            .post<{ message: string; data: Reservation }>(environment.SERVER_URL + `/user/booking`, reqBody)
            .subscribe({
                next: (data) => {
                    this.snackbar.open(data.message, 'OK', { duration: 4000 });
                    this.router.navigateByUrl('/user/reservation-list');
                },
                error: (err) => console.log(err),
            });
    }

    review(payload: any, restaurantId: string) {
        if (!this.checkLogin()) {
            return;
        }

        const reqBody = {
            ...payload,
            clientId: this.authSv.user?.id,
            restaurantId,
        };
        this.http.post<{ message: string; data: Review }>(environment.SERVER_URL + '/user/review', reqBody).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => console.log(err),
        });
    }
}
