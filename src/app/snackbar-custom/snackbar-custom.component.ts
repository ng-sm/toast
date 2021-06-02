import { Component } from '@angular/core';
import { SnackbarComponent } from '../snackbar/components';

@Component({
  selector: 'app-snackbar-custom',
  templateUrl: './snackbar-custom.component.html',
  styleUrls: ['./snackbar-custom.component.scss'],
  host: { 'class': 'snackbar' }
})
export class SnackbarCustomComponent extends SnackbarComponent {}
