import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    if (true) {
      return next.handle(request.clone({
    
        headers: request.headers
        
          .set('apikey' , 'zl6n4szz05mAd0uXZVDCf1kiZPtOY6eQ')
      }));
    }
    return next.handle(request);
    
  }

}
