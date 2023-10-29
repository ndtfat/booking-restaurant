import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private authSv: AuthService, private _snackbar: MatSnackBar) {}

    saveRestaurant(restaurantId: string) {
        this.http
            .post<{ message: string }>(environment.SERVER_URL + '/user/save-restaurant', {
                userId: this.authSv.user?.id,
                restaurantId,
            })
            .subscribe((res) => {
                this._snackbar.open(res.message, 'OK');
            });
    }
}
