import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()

export class TokenInterceptorServices implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    const headers = new HttpHeaders({
      'x-token':localStorage.getItem('token') || ''
    });

    const reqClone = req.clone({
      headers
      
    });

    return next.handle(reqClone).pipe(
      catchError(this.manejaError)
    );
  }

  manejaError(error: HttpErrorResponse)
  {
    return throwError("Error Personalizado: "+ error)
  }
}