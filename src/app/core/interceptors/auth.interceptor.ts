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
        
          .set('apikey' , 'dPgpk8ggM3knGU0T5ABV3IDL9KLDVnq2')
      }));
    }
    return next.handle(request);
    
  }

}
