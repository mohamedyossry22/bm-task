import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {


  count = 0;

  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();

    this.count++;

    return next.handle(req)

      .pipe(tap(

        event => { },

        error => { }

      ), finalize(() => {

        this.count--;

        if (this.count === 0) { this.spinner.hide(); }
      })
      );
  }
}
