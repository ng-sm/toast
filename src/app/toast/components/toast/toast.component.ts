import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, interval, of, Subject } from 'rxjs';
import { delayWhen, filter, take, takeUntil } from 'rxjs/operators';
import { ToastConfig } from '../../shared/toast.model';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  host: { 'class': 'toast' }
})
export class ToastComponent<T = null> implements OnInit, OnDestroy {
  @Input() class = 'toast';
  @Input() config!: ToastConfig<T>;

  unsubscribe$ = new Subject();

  @HostBinding('class')
  get getClass(): string {
    return `${this.class} ${this.config?.type}`;
  }

  @HostBinding('class.is-close-icon')
  get isCloseIconClass(): boolean {
    return !this.config?.isCloseIconHidden;
  }

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.autoClose();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  autoClose(): void {
    const toast$ = new BehaviorSubject<ToastConfig<T>>(this.config);

    toast$
      .pipe(
        filter((toast) => !!toast?.duration),
        delayWhen(({ duration }) => duration
          ? interval(duration)
          : of(undefined)
        ),
        takeUntil(this.unsubscribe$),
        take(1)
      ).subscribe(() => this.close());
  }

  close(): void {
    this.toastService.close(this.config);
  }
}
