import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreService } from '../services/core.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private injetor:Injector ) {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
   
    return next.handle(req).pipe(
    
      catchError((error: HttpErrorResponse) => {
        let coreService = this.injetor.get(CoreService)
        coreService.errorToaster(error?.error?.info)
        return throwError(error);
      })
    );
  }


}
