import { AnimationEvent } from '@angular/animations';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { toastAnimations } from '../../shared/toast.animation';
import { ToastAnimationState, ToastConfig } from '../../shared/toast.model';
import { ToastService } from '../../shared/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { ToastContainerDirective } from './toast-container.directive';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  animations: [toastAnimations.toastState],
  host: {
    'class': 'toast-container',
    '[@state]': 'animationState',
    '(@state.done)': 'onAnimationEnd($event)'
  },
})
export class ToastContainerComponent implements OnInit {
  animationState: ToastAnimationState = 'void';

  @ViewChild(ToastContainerDirective, { static: true })
  adHost!: ToastContainerDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.toastService
      .toast$
      .pipe(debounceTime(200))
      .subscribe(item => this.onNewToast(item));

    this.toastService
      .clear$
      .subscribe(() => this.onClear());
  }

  public onAnimationEnd(event: AnimationEvent) {
    const { fromState, toState } = event;

    if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();
    }
  }

  private onNewToast(toast: ToastConfig<unknown>): void {
    const viewContainerRef = this.adHost.viewContainerRef;

    return !viewContainerRef.length
      ? this.addComponent(toast)
      : this.replaceComponent(toast);
  }

  private replaceComponent(toast: ToastConfig<unknown>): void {
    this.onClear();
    setTimeout(() => this.addComponent(toast), 200);
  }

  private addComponent(config: ToastConfig<unknown>): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentConfig = config || this.toastService.config;
    const component = componentConfig.component || componentConfig.component || ToastComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.config = componentConfig;
    this.animationState = 'visible';
  }

  private onClear(): void {
    this.animationState = 'hidden';
  }
}
