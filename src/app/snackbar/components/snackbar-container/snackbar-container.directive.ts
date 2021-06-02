import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class SnackbarContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
