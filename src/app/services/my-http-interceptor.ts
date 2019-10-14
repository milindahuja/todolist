/**
 * Created By : Milind Ahuja 
 */

import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
    Router
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      //Check for url. If it is login or register url then return
        if (request.url.includes('/login') || request.url.includes('/users')) {
          return next.handle(request);
        }
        const token = JSON.parse(localStorage.getItem('userData'))['token'];
        if (token) {
          request = request.clone({
            setHeaders: {
              'x-access-token': token
            }
          });
        }
      
        if (!request.headers.has('Content-Type')) {
          request = request.clone({
            setHeaders: {
              'content-type': 'application/json'
            }
          });
        }
      
        request = request.clone({
          headers: request.headers.set('Accept', 'application/json')
        });
      
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              if (error.error.success === false) {
                this.toastr.error('Login Failed');
              } else {
                this.router.navigate(['/login']);
              }
            }
            return throwError(error);
          }));
      }
}

/**
 * Created By : Milind Ahuja 
 */