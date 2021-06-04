import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, interval, of, Subject } from 'rxjs';
import { delayWhen, filter, take, takeUntil } from 'rxjs/operators';
import { SnackbarConfig, SnackbarType } from '../../shared/snackbar.model';
import { SnackbarService } from '../../shared/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  host: { 'class': 'snackbar' }
})
export class SnackbarComponent<T = null> implements OnInit, OnDestroy {
  @Input() class = 'snackbar';
  @Input() config!: SnackbarConfig<T>;

  unsubscribe$ = new Subject();

  @HostBinding('class')
  get getClass(): string {
    return `${this.class} ${this.config?.type}`;
  }

  @HostBinding('class.is-close-icon')
  get isCloseIconClass(): boolean {
    return !this.config?.isCloseIconHidden;
  }

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    const snackbar$ = new BehaviorSubject<SnackbarConfig<T>>(this.config);

    snackbar$
      .pipe(
        filter((snackbar) => !!snackbar?.duration),
        delayWhen(({ duration }) => duration
          ? interval(duration)
          : of(undefined)
        ),
        takeUntil(this.unsubscribe$),
        take(1)
      ).subscribe(() => this.close());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  close(): void {
    this.snackbarService.close(this.config);
  }
}
