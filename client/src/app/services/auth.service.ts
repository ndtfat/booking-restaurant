import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import User from '../models/User';
import Restaurant from '../models/Restaurant';
import { catchError, Observable, of, switchMap } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private snackBar: MatSnackBar,
        private fbStorage: AngularFireStorage,
    ) {}

    get user(): User | null {
        const userJSON = localStorage.getItem('user');
        return userJSON ? JSON.parse(userJSON) : null;
    }

    setUser(userData: User) {
        localStorage.setItem('user', JSON.stringify(userData));
    }

    get restaurant(): Restaurant | null {
        const restaurantJSON = localStorage.getItem('user');
        return restaurantJSON ? JSON.parse(restaurantJSON) : null;
    }

    refreshToken(): Observable<{ message: string; data: string }> {
        return this.http.post<{ message: string; data: string }>(environment.SERVER_URL + '/auth/refreshToken', {
            userId: this.user?.id,
        });
    }

    register(payload: any) {
        this.http.post(environment.SERVER_URL + '/auth/register', payload).subscribe({
            next: () => {
                this.router.navigateByUrl('/auth/login');
            },
            error: (err) => {
                this.snackBar.open(err.error.message, 'OK');
            },
        });
    }

    async registerRestaurant(payload: any) {
        //upload restaurant photo to firebase
        const file: File = payload.restaurantInfo.photo;
        let uploadedPhoto: string = '';
        if (file) {
            const path = `restaurant-photo/${file.name}`;
            const uploadTask = await this.fbStorage.upload(path, file);
            uploadedPhoto = await uploadTask.ref.getDownloadURL();
        }

        payload = {
            ownerInfo: payload.ownerInfo,
            restaurantInfo: {
                ...payload.restaurantInfo,
                photo: uploadedPhoto,
                payments: payload.restaurantInfo.payments.split(','),
            },
        };

        this.http
            .post<{ message: string; data: { user: User; restaurant: Restaurant } }>(
                environment.SERVER_URL + '/auth/register-restaurant',
                payload,
            )
            .subscribe({
                next: (res) => {
                    this.router.navigateByUrl('/auth/login');
                },
                error: (err: any) => {
                    console.log(err);
                    this.snackBar.open(err.error.message, 'OK');
                },
            });
    }

    login(payload: any) {
        this.http
            .post<{ message: string; data: { user: User; restaurant: Restaurant | null } }>(
                environment.SERVER_URL + '/auth/login',
                payload,
            )
            .subscribe({
                next: (res) => {
                    const userRes = res.data.user;
                    const restaurantRes = res.data.restaurant;
                    localStorage.setItem('user', JSON.stringify(userRes));
                    localStorage.setItem('restaurant', JSON.stringify(restaurantRes));
                    this.router.navigateByUrl('/');
                },
                error: (err) => {
                    this.snackBar.open(err.error.message, 'OK');
                },
            });
    }

    signOut() {
        console.log('Signing out');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/auth/login');
    }

    loginGoogle() {
        return this.http.get(environment.SERVER_URL + '/auth/login/google');
    }
}
