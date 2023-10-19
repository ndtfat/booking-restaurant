import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class RefeshTokenInterceptor implements HttpInterceptor {
    isRefreshing: boolean = false;
    refreshTOkenObject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let reqWithToken = request;
        const token = this.authService.user?.accessToken;

        if (token) {
            reqWithToken = this.addTokenToRequest(request, token);
        }
        return next.handle(reqWithToken).pipe(
            catchError((error) => {
                const errorMessage = error.error.message;
                // Singout when refresh token is expired
                if (errorMessage.includes('Refresh Token expired')) {
                    this.authService.signOut();
                    return throwError(error);
                }
                // handle when access token is expired
                if (
                    error instanceof HttpErrorResponse &&
                    !reqWithToken.url.includes('auth/login') &&
                    error.status === 401
                ) {
                    return this.handle401Error(reqWithToken, next);
                }

                return throwError(error);
            }),
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTOkenObject.next(null);

            const refreshToken = this.authService.user?.refreshToken;
            if (refreshToken) {
                return this.authService.refreshToken(refreshToken).pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;
                        console.log(token);

                        // token: { message: string, data: string }}
                        this.refreshTOkenObject.next(token.data);

                        return next.handle(this.addTokenToRequest(request, token.data));
                    }),
                    catchError((error) => {
                        this.isRefreshing = false;
                        this.authService.signOut();
                        return throwError(error); // Rethrow the error to propagate it up the observable chain.
                    }),
                );
            }
        }

        return this.refreshTOkenObject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => {
                console.log(token);
                return next.handle(this.addTokenToRequest(request, token));
            }),
        );
    }

    private addTokenToRequest(request: HttpRequest<any>, token: string) {
        return request.clone({
            headers: request.headers.set('authentication', 'Bearer ' + token),
        });
    }
}
