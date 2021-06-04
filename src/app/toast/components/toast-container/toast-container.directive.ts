import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class ToastContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
