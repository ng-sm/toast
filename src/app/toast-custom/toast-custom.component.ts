import { Component } from '@angular/core';
import { ToastComponent } from '../toast/components';

export interface ToastMetada {
  title: string;
}

@Component({
  selector: 'app-toast-custom',
  templateUrl: './toast-custom.component.html',
  styleUrls: ['./toast-custom.component.scss'],
  host: { 'class': 'toast-custom' }
})
export class ToastCustomComponent extends ToastComponent<ToastMetada> {}
