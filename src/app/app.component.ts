import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ToastCustomComponent } from './toast-custom/toast-custom.component';
import { ToastComponent } from './toast/components';
import { ToastType } from './toast/shared/toast.model';
import { ToastService } from './toast/shared/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('custom') Toast?: TemplateRef<any>;
  title = 'toast-app';

  constructor(
    private toastService: ToastService,
    private httpClient: HttpClient,
  ) {}

  test(): void {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon/dittos', {
        headers: {
          toastSuccess: 'No i pobrałem ditto',
          toastError: 'Rozpoczynam pobieranie',
        }
      }).subscribe();
  }


  test2(): void {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon/dittos', {
        headers: {
          toastSuccess: 'No i pobrałem ditto',
          toastErrorHandler: 'true',
          toastInfo: 'Rozpoczynam pobieranie',
        }
      }).subscribe();
  }

  ngAfterViewInit() {
    // this.open('my new toast');
    this.toastService.config = {
      ...this.toastService.config,
      duration: 0
    }
    this.test()
  }

  open(message: string): void {
    this.toastService.open({
      type: 'success',
      message
    });
  }

  addTemplate(message: string): void {
    this.toastService.open({
      message,
      type: ToastType.WARNING,
      component: ToastCustomComponent,
      metadata: {
        title: 'title',
      }
    });
  }

  close(): void {
    this.toastService.close();
  }
}

@Component({
  selector: 'app-toast-custom2',
  template: '<div>My custom toast2</div>',
})
export class TestToastComponent extends ToastComponent {}
