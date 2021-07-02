import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent, ToastComponent, ToastContainerDirective } from './components';
import { ToastService } from './shared/toast.service';
import { ToastConfig } from './shared/toast.model';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastInterceptor } from './shared/toast.interceptor';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ToastComponent,
    ToastContainerComponent,
    ToastContainerDirective,
  ],
  exports: [
    ToastContainerComponent,
  ],
  providers: [
    ToastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToastInterceptor,
      multi: true,
    },
  ]
})
export class ToastModule {
  static forRoot(config: ToastConfig): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: 'config',
          useValue: config,
        }
      ]
    };
  }

  constructor(
    @Optional() @Inject('config') private config: ToastConfig,
    private toastService: ToastService,
  ) {
    this.toastService.config.component = ToastComponent;
    this.toastService.defaultErrorHandler = this.toastService.config.errorHandler;

    if (this.config) {
      this.toastService.config = {
        ...this.toastService.config,
        ...this.config
      };
    }
  }
}
