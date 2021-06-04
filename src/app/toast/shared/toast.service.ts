import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastComponent } from '../components';
import { ToastConfig, ToastType } from './toast.model';

@Injectable()
export class ToastService {
  public config: ToastConfig = {
    duration: 3000,
    isCloseIconHidden: false,
    type: ToastType.DEFAULT,
    component: ToastComponent,
  };

  public toast$ = new Subject<ToastConfig<unknown>>();
  public clear$ = new Subject<ToastConfig<unknown>>();

  constructor() {}

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
}
