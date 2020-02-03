import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(){}//private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request:', request.url);
        // add auth header with jwt if user is logged in and request is to api url
        // const currentUser = this.authenticationService.currentUserValue;
        const jwtToken = localStorage.getItem('authToken');
        // const isLoggedIn = currentUser && jwtToken;
        const isApiUrl = request.url.startsWith(environment.apiURL);
        // if (isLoggedIn && isApiUrl) {
        if (jwtToken && isApiUrl){
            console.log('Adding authorization');
            request = request.clone({
                setHeaders: {
                    Authorization: jwtToken
                }
            });
        }
        return next.handle(request);
    }
}
