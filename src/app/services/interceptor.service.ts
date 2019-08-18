import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';
import { LoadingService } from './loading.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(public loading: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('http start');
    // this.common.openSpinner();
    // this.loading.present();
    // const mergedHeaders = new HttpHeaders({
    // });

    // const req = request.clone({
    //   headers: mergedHeaders
    // }); 

    return next.handle(request).pipe(
      tap(
        event => {console.log('http start222',request.url,request.method);
            // this.loading.dismiss();
        },
        catchError((err: HttpErrorResponse) => this.ErrorHandle(err))
      )
    );
  }

  private ErrorHandle(
    event: HttpResponse<any> | HttpErrorResponse,
  ): Observable<any> {
    this.loading.dismiss();
    return throwError(event);
  }
}
