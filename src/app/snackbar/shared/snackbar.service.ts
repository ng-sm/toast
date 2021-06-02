import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarComponent } from '../components';
import { SnackbarConfig, SnackbarType } from './snackbar.model';

@Injectable()
export class SnackbarService {
  config: SnackbarConfig = {
    duration: 3000,
    isCloseIconHidden: false,
    type: SnackbarType.ERROR,
    component: SnackbarComponent,
  };

  public snackbar$ = new Subject<SnackbarConfig>();
  public clear$ = new Subject<SnackbarConfig>();

  constructor() {}

  public open(config: SnackbarConfig = {}): void {
    this.snackbar$.next({
      ...this.config,
      ...config
    });
  }

  public close(config: SnackbarConfig = {}): void {
    this.clear$.next({
      ...this.config,
      ...config
    });
  }
}
