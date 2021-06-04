import { AnimationEvent } from '@angular/animations';
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { snackbarAnimations } from '../../shared/snackbar.animation';
import { SnackbarConfig } from '../../shared/snackbar.model';
import { SnackbarService } from '../../shared/snackbar.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { SnackbarContainerDirective } from './snackbar-container.directive';

@Component({
  selector: 'app-snackbar-container',
  templateUrl: './snackbar-container.component.html',
  styleUrls: ['./snackbar-container.component.scss'],
  animations: [snackbarAnimations.snackBarState],
  host: {
    'class': 'snackbar-container',
    '[@state]': 'animationState',
    '(@state.done)': 'onAnimationEnd($event)'
  },
})
export class SnackbarContainerComponent implements OnInit {
  @ViewChild(SnackbarContainerDirective, { static: true })
  adHost!: SnackbarContainerDirective;

  animationState = 'void';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.snackbarService
      .snackbar$
      .pipe(debounceTime(200))
      .subscribe(item => this.onNewSnackbar(item));

    this.snackbarService
      .clear$
      .subscribe(() => this.onClear());
  }

  onAnimationEnd(event: AnimationEvent) {
    const { fromState, toState } = event;

    if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();
    }
  }

  public onNewSnackbar(snackbar: SnackbarConfig<unknown>): void {
    const viewContainerRef = this.adHost.viewContainerRef;

    return !viewContainerRef.length
      ? this.addComponent(snackbar)
      : this.replaceComponent(snackbar);
  }

  public replaceComponent(snackbar: SnackbarConfig<unknown>): void {
    this.onClear();
    setTimeout(() => this.addComponent(snackbar), 200);
  }

  public addComponent(config: SnackbarConfig<unknown>): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentConfig = config || this.snackbarService.config;
    const component = componentConfig.component || componentConfig.component || SnackbarComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.config = componentConfig;
    this.animationState = 'visible';
  }

  public onClear(): void {
    this.animationState = 'hidden';
  }
}
