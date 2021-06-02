import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarContainerComponent, SnackbarComponent, SnackbarContainerDirective } from './components';
import { SnackbarService } from './shared/snackbar.service';
import { SnackbarConfig } from './shared/snackbar.model';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [
    SnackbarComponent,
    SnackbarContainerComponent,
    SnackbarContainerDirective,
  ],
  exports: [
    SnackbarContainerComponent,
  ],
  providers: [
    SnackbarService
  ]
})
export class SnackbarModule {
  static forRoot(config: SnackbarConfig): ModuleWithProviders<SnackbarModule> {
    return {
      ngModule: SnackbarModule,
      providers: [
        {
          provide: 'config',
          useValue: config,
        }
      ]
    };
  }

  constructor(
    @Optional() @Inject('config') private config: SnackbarConfig,
    private snackbarService: SnackbarService,
  ) {
    if (this.config) {
      this.snackbarService.config = {
        ...this.snackbarService.config,
        ...this.config
      };
    }
  }
}
