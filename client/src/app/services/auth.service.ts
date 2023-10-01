import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user!: User;

    constructor(private http: HttpClient) {}

    register(payload: any) {
        this.http.post(environment.SERVER_URL, payload).subscribe;
    }
}
