import { Type } from '@angular/core';

export const SnackbarType = {
  DEFAULT: 'default',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
} as const;

export type SnackbarTypes = typeof SnackbarType[keyof typeof SnackbarType];

export interface SnackbarConfig<T = null> {
  message?: string;
  component?: Type<any>;
  type?: SnackbarTypes;
  duration?: number;
  isCloseIconHidden?: boolean;
  metadata?: T;
}
