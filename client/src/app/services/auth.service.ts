import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

import User from '../models/User';
import Restaurant from '../models/Restaurant';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    #user!: User;
    #restaurant!: Restaurant | null;

    constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

    get user(): User {
        return this.#user;
    }

    get restaurant(): Restaurant | null {
        return this.#restaurant;
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

    registerRestaurant(payload: any) {
        console.log(payload);
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
                    this.#user = res.data.user;
                    this.#restaurant = res.data.restaurant;
                    this.router.navigateByUrl('/');
                },
                error: (err) => {
                    this.snackBar.open(err.error.message, 'OK');
                },
            });
    }

    loginGoogle() {
        return this.http.get(environment.SERVER_URL + '/auth/login/google');
    }
}
