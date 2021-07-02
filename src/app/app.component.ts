import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { ToastCustomComponent, ToastMetada } from './toast-custom/toast-custom.component';
import { ToastComponent, ToastType, ToastService } from '@ngsm/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private toastService: ToastService,
    private httpClient: HttpClient,
  ) { }

  testSimple(): void {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon/ditto-error', {
        headers: {
          toastSuccess: 'Success! Example message.',
          toastError: 'Error! Example message.',
        }
      }).subscribe();
  }


  testErrorHandler(): void {
    this.httpClient
      .get('https://pokeapi.co/api/v2/pokemon/ditto-error', {
        headers: {
          toastSuccess: 'Success! Example message.',
          toastInfo: 'Error! Example message.',
          toastErrorHandler: 'true',
        }
      }).subscribe();
  }

  ngAfterViewInit() {
    this.testSimple()
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
  selector: 'app-toast-custom',
  template: '<div>My custom toast {{ config?.metadata?.title }}</div>',
})
export class TestToastComponent extends ToastComponent<ToastMetada> {}
