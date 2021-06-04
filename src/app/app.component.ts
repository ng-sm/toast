import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { SnackbarCustomComponent } from './snackbar-custom/snackbar-custom.component';
import { SnackbarComponent } from './snackbar/components';
import { SnackbarType } from './snackbar/shared/snackbar.model';
import { SnackbarService } from './snackbar/shared/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('custom') templateSnackbar?: TemplateRef<any>;
  title = 'snackbar-app';

  constructor(public snackbarService: SnackbarService) {}

  ngAfterViewInit() {
    this.open('my new toast');
  }

  open(message: string): void {
    this.snackbarService.open({
      type: 'success',
      message
    });
  }

  addTemplate(message: string): void {
    this.snackbarService.open({
      message,
      type: SnackbarType.WARNING,
      component: SnackbarCustomComponent,
      metadata: {
        title: 'title',
      }
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
export class CustomSnackbarComponent extends SnackbarComponent {}
