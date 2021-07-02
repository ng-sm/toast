import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastConfig, ToastErrorHandler, ToastType } from './toast.model';

@Injectable()
export class ToastService {
  public toast$ = new Subject<ToastConfig<unknown>>();
  public clear$ = new Subject<ToastConfig<unknown>>();
  public defaultErrorHandler?: ToastErrorHandler;

  public config: ToastConfig = {
    duration: 3000,
    isCloseIconHidden: false,
    type: ToastType.DEFAULT,
    errorHandler: (error: HttpErrorResponse): string => error?.message,
  };

  public open<T>(config: ToastConfig<T> = {}): void {
    this.toast$.next({
      ...this.config,
      ...config
    });
  }

  public close<T>(config: ToastConfig<T> = {}): void {
    this.clear$.next({
      ...this.config,
      ...config
    });
  }

  public setErrorHandler(errorHandler: ToastErrorHandler): void {
    this.config.errorHandler = errorHandler;
  }

  public setDefaultErrorHandler(): void {
    this.config.errorHandler = this.defaultErrorHandler;
  }
}
