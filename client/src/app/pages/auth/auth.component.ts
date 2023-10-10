import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    pwShow: boolean = false;
    pwTyping: boolean = false;
    authType!: string;

    formGroup = new FormGroup({
        email: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
    });

    @ViewChild('pwInput') input!: ElementRef;

    constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.authType = event.url.includes('login') ? 'login' : 'register';
            }
        });
    }

    onPasswordChange(e: Event) {
        this.pwTyping = !!this.formGroup.value.password;
    }

    onShowPassword() {
        this.pwShow = !this.pwShow;
        this.input.nativeElement.type = this.input.nativeElement.type === 'password' ? 'text' : 'password';
    }

    onChangeAuthType(type: string) {
        if (type === 'register-restaurant') this.router.navigateByUrl('/register-restaurant');
        else this.authType = type;
    }

    isValidForSubmit(): boolean {
        if (
            this.authType === 'register' &&
            (!this.formGroup.value.email || !this.formGroup.value.password || !this.formGroup.value.username)
        )
            return false;

        if (this.authType === 'login' && (!this.formGroup.value.email || !this.formGroup.value.password)) return false;
        return true;
    }

    onSubmitForm() {
        if (this.isValidForSubmit()) {
            if (this.authType === 'register') {
                this.authService.register(this.formGroup.value);
            }
            if (this.authType === 'login') {
                const { username, ...payload } = this.formGroup.value;
                this.authService.login(payload);
            }
        } else {
            this.snackBar.open('Please fill in all fields', 'OK');
        }
    }

    onLoginGoogle() {
        // this.authService.loginGoogle().subscribe(() => {});
    }
}
