import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, timeout } from 'rxjs';
import { LineregisterService } from './lineregister.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private lineService: LineregisterService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.lineService.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(() => {
        this.lineService.isLoading.next(false);
      })
    );
  }
}
