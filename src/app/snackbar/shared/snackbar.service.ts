import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarConfig } from './snackbar.model';

@Injectable()
export class SnackbarService {
  config: SnackbarConfig = {};

  public snackbar$ = new Subject<SnackbarConfig<unknown>>();
  public clear$ = new Subject<SnackbarConfig<unknown>>();

  constructor() {}

  public open<T>(config: SnackbarConfig<T> = {}): void {
    this.snackbar$.next({
      ...this.config,
      ...config
    });
  }

  public close<T>(config: SnackbarConfig<T> = {}): void {
    this.clear$.next({
      ...this.config,
      ...config
    });
  }
}
