import { Component } from '@angular/core';
import { SnackbarComponent } from '../snackbar/components';

export interface SnackbarMetada {
  title: string;
}

@Component({
  selector: 'app-snackbar-custom',
  templateUrl: './snackbar-custom.component.html',
  styleUrls: ['./snackbar-custom.component.scss'],
  host: { 'class': 'snackbar-custom' }
})
export class SnackbarCustomComponent extends SnackbarComponent<SnackbarMetada> {}
