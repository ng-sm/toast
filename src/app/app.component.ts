import { Component, TemplateRef, ViewChild } from '@angular/core';
import { SnackbarCustomComponent } from './snackbar-custom/snackbar-custom.component';
import { SnackbarType } from './snackbar/shared/snackbar.model';
import { SnackbarService } from './snackbar/shared/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('custom') templateSnackbar?: TemplateRef<any>;
  title = 'snackbar-app';

  constructor(public snackbarService: SnackbarService) {}

  open(message: string): void {
    this.snackbarService.open({
      type: SnackbarType.SUCCESS,
    });
  }

  addTemplate(message: string): void {
    this.snackbarService.open({
      message,
      type: SnackbarType.WARNING
    });
  }

  close(): void {
    this.snackbarService.close();
  }
}

@Component({
  selector: 'app-snackbar-custom2',
  template: '<div>My custom snackbar2</div>',
})
export class CustomSnackbarComponent extends SnackbarCustomComponent {}
