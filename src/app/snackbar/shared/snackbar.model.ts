import { Type } from "@angular/core";

export enum SnackbarType {
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface SnackbarConfig {
  message?: string;
  component?: Type<any>;
  type?: SnackbarType;
  duration?: number;
  isCloseIconHidden?: boolean;
}
