import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastHttpConfig, ToastType} from './toast.model';

@Injectable()
export class ToastInterceptor implements HttpInterceptor {
  public readonly successKey = 'toastSuccess';
  public readonly errorKey = 'toastError';
  public readonly errorHandlerKey = 'toastErrorHandler';
  public readonly infoKey = 'toastInfo';

  constructor(
    private toastService: ToastService,
  ) {}

  getConfig(request: HttpRequest<unknown>): ToastHttpConfig {
    return {
      toastSuccess: request.headers.get(this.successKey) || '',
      toastError: request.headers.get(this.errorKey) || '',
      toastErrorHandler: request.headers.get(this.errorHandlerKey) || '',
      toastInfo: request.headers.get(this.infoKey) || '',
    };
  }

  deleteHeaders(request: HttpRequest<unknown>): HttpHeaders {
    return request.headers
      .delete(this.successKey)
      .delete(this.errorKey);
  }

  parseRequest(request: HttpRequest<unknown>): HttpRequest<unknown>  {
    return !request.headers.has(this.successKey)
      ? request
      : request.clone({ headers: this.deleteHeaders(request) });
  }

  handleSuccess(response: HttpEvent<unknown>, httpConfig: ToastHttpConfig): void {
    if (response instanceof HttpResponse && !!httpConfig.toastSuccess) {
      this.toastService.open({
        message: httpConfig.toastSuccess,
        type: ToastType.SUCCESS,
      });
    }
  }

  handleError(error: HttpErrorResponse, httpConfig: ToastHttpConfig): Observable<never> {
    if (!!httpConfig.toastError || !!httpConfig.toastErrorHandler) {
      const message = httpConfig.toastError || this.toastService.config?.errorHandler?.(error);

      this.toastService.open({
        message,
        type: ToastType.ERROR,
      });
    }
    return throwError(error);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const httpConfig = this.getConfig(request);

    if (!httpConfig.toastError
      && !httpConfig.toastSuccess
      && !httpConfig.toastInfo
      && !httpConfig.toastErrorHandler
    ) {
      return next.handle(request);
    }

    if (!!httpConfig.toastInfo) {
      this.toastService.open({
        message: httpConfig.toastInfo,
        type: ToastType.INFO,
      });
    }

    return next
      .handle(this.parseRequest(request))
      .pipe(
        tap(response => this.handleSuccess(response, httpConfig)),
        catchError(error => this.handleError(error, httpConfig)),
      );
  }
}
