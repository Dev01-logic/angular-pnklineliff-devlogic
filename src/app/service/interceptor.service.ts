import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(() => {
        //this.reponseCache.set(req.urlWithParams);
        this.loaderService.isLoading.next(false);
      })
    );
  }
}
