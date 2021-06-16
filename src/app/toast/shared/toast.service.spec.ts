import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastConfig, ToastErrorHandler } from './toast.model';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ToastService,
      ]
    })
    .compileComponents();

    toastService = TestBed.inject(ToastService);
  });

  it('should has defined default configuration', () => {
    expect(toastService.config).toBeTruthy();
  });

  it('should set custom error handler', () => {
    const errorHandler: ToastErrorHandler = error => error.name;

    toastService.setErrorHandler(errorHandler);

    expect(toastService.config.errorHandler).toEqual(errorHandler);
  });

  it('should set error handler to default configuration', () => {
    const errorHandler: ToastErrorHandler = error => error.name;

    toastService.defaultErrorHandler = errorHandler;
    toastService.setDefaultErrorHandler();

    expect(toastService.config.errorHandler).toEqual(toastService.defaultErrorHandler);
  });

  it('"open" function should emit "toast$" event', (done) => {
    const newToast: ToastConfig = { message: 'Test' };

    toastService.toast$.subscribe(item => {
      expect(item).toEqual({
        ...toastService.config,
        ...newToast
      });
      done();
    })

    toastService.open(newToast);
  });

  it('"close" function should emit "clear$" event', (done) => {
    const newToast: ToastConfig = { message: 'Test' };

    toastService.clear$.subscribe(item => {
      expect(item).toEqual({
        ...toastService.config,
        ...newToast
      });
      done();
    })

    toastService.close(newToast);
  });
});
