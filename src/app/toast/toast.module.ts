import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent, ToastComponent, ToastContainerDirective } from './components';
import { ToastService } from './shared/toast.service';
import { ToastConfig, ToastType } from './shared/toast.model';

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
    ToastService
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
    if (this.config) {
      this.toastService.config = {
        ...this.toastService.config,
        ...this.config
      };
    }
  }
}
