import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    pwTyping: boolean = false;
    pwShow: boolean = false;
    formValue = {
        email: '',
        password: '',
        username: '',
    };

    authType!: string;

    constructor(private router: Router, private authService: AuthService) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.authType = event.url.includes('login')
                    ? 'login'
                    : 'register';
            }
        });
    }

    @ViewChild('pwInput') input!: ElementRef;

    onPasswordChange(e: Event) {
        this.pwTyping = !!this.formValue.password;
    }

    onShowPassword() {
        this.pwShow = !this.pwShow;
        this.input.nativeElement.type =
            this.input.nativeElement.type === 'password' ? 'text' : 'password';
    }

    onChangeAuthType(type: string) {
        this.authType = type;
    }

    onSubmitForm() {}
}
