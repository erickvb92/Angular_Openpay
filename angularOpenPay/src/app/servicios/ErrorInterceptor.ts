/*
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && localStorage.getItem('Usuario')) {
                // auto logout if 401 or 403 response returned from api
                //localStorage.removeItem('Usuario');
                //localStorage.removeItem('token');
                //this.router.navigate(['/login']).then()
                alert("ErrorInterceptor")
            }

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(() => error);
        }))
    }
  
}  */