import { Type } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';

export const ToastType = {
  DEFAULT: 'default',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
} as const;

export type ToastTypes = typeof ToastType[keyof typeof ToastType];

export type ToastAnimationState = 'void' | 'hidden' | 'visible';
export interface ToastConfig<T = null> {
  message?: string;
  component?: Type<ToastComponent<unknown>>;
  type?: ToastTypes;
  duration?: number;
  isCloseIconHidden?: boolean;
  metadata?: T;
}
