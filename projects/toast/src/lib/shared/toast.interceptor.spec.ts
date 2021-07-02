import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastInterceptor } from './toast.interceptor';
import { HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ToastErrorHandler, ToastHttpConfig, ToastType } from './toast.model';

describe('ToastInterceptor', () => {
  let toastService: ToastService;
  let toastInterceptor: ToastInterceptor;
  let requestHeaders: HttpHeaders;
  let requestMock: HttpRequest<unknown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ToastService,
        ToastInterceptor,
      ]
    })
    .compileComponents();

    toastService = TestBed.inject(ToastService);
    toastInterceptor = TestBed.inject(ToastInterceptor);

    requestHeaders = new HttpHeaders({
      [toastInterceptor.successKey]: 'test-success',
      [toastInterceptor.errorKey]: 'test-error',
      [toastInterceptor.infoKey]: 'test-info',
      [toastInterceptor.errorHandlerKey]: 'false',
    });
    requestMock = new HttpRequest('GET', 'https://test.com/', { headers: requestHeaders });
  });

  it('should be defined', () => {
    expect(toastInterceptor).toBeDefined();
  });

  it('#getConfig should return config structure based on headers', () => {
    const config = toastInterceptor.getConfig(requestMock);

    expect(config).toEqual({
      toastError: 'test-error',
      toastSuccess: 'test-success',
      toastInfo: 'test-info',
      toastErrorHandler: false
    });
  });

  it('#deleteHeaders should remove http query headers', () => {
    expect(requestMock.headers.get(toastInterceptor.successKey)).toEqual('test-success');
    expect(requestMock.headers.get(toastInterceptor.errorKey)).toEqual('test-error');
    expect(requestMock.headers.get(toastInterceptor.infoKey)).toEqual('test-info');
    expect(requestMock.headers.get(toastInterceptor.errorHandlerKey)).toEqual('false');

    const transformedHeaders = toastInterceptor.deleteHeaders(requestMock);

    expect(transformedHeaders.get(toastInterceptor.successKey)).toEqual(null);
    expect(transformedHeaders.get(toastInterceptor.errorKey)).toEqual(null);
    expect(transformedHeaders.get(toastInterceptor.infoKey)).toEqual(null);
    expect(transformedHeaders.get(toastInterceptor.errorHandlerKey)).toEqual(null);
  });

  it('#parseRequest should return not changed request when HttpHeaders not exist', () => {
    const requestWithoutHttpHeaders =  new HttpRequest('GET', 'https://test.com/');

    expect(toastInterceptor.parseRequest(requestWithoutHttpHeaders)).toEqual(requestWithoutHttpHeaders);
  });

  it('#parseRequest should return changed request when HttpHeaders exist', () => {
    const transformedRequest = toastInterceptor.parseRequest(requestMock);

    expect(transformedRequest.headers.get(toastInterceptor.successKey)).toEqual(null);
    expect(transformedRequest.headers.get(toastInterceptor.errorKey)).toEqual(null);
    expect(transformedRequest.headers.get(toastInterceptor.infoKey)).toEqual(null);
    expect(transformedRequest.headers.get(toastInterceptor.errorHandlerKey)).toEqual(null);
  });

  it('#handleSuccess should open SUCCESS toast', () => {
    const queeryActionSpyOn = spyOn(toastService, 'open');
    const config: ToastHttpConfig = {
      toastError: 'test-error',
      toastSuccess: 'test-success',
      toastInfo: 'test-info',
      toastErrorHandler: false
    };
    const response = new HttpResponse({ body: 'test' });

    toastInterceptor.handleSuccess(response, config);

    expect(queeryActionSpyOn).toHaveBeenCalledWith({
      message: config.toastSuccess,
      type: ToastType.SUCCESS,
    });
  });

  it('#handleError should open ERROR toast without error handler', () => {
    const queeryActionSpyOn = spyOn(toastService, 'open');
    const config: ToastHttpConfig = {
      toastError: 'test-error',
      toastSuccess: 'test-success',
      toastInfo: 'test-info',
      toastErrorHandler: false
    };
    const error = new HttpErrorResponse({ error: 'test' });

    toastInterceptor.handleError(error, config);

    expect(queeryActionSpyOn).toHaveBeenCalledWith({
      message: config.toastError,
      type: ToastType.ERROR,
    });
  });

  it('#handleError should open ERROR toast with error handler', () => {
    const queeryActionSpyOn = spyOn(toastService, 'open');
    const config: ToastHttpConfig = {
      toastError: '',
      toastSuccess: 'test-success',
      toastInfo: 'test-info',
      toastErrorHandler: true
    };
    const error = new HttpErrorResponse({ error: 'test' });
    const errorHandler: ToastErrorHandler = error => error.error;
    toastService.setErrorHandler(errorHandler);

    toastInterceptor.handleError(error, config);

    expect(queeryActionSpyOn).toHaveBeenCalledWith({
      message: 'test',
      type: ToastType.ERROR,
    });
  });

});
