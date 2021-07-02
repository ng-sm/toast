import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const toastAnimations: { readonly toastState: AnimationTriggerMetadata } = {
  toastState: trigger('state', [
    state('void, hidden', style({
      transform: 'translateY(10px)',
      opacity: 0,
    })),
    state('visible', style({
      transform: 'translateY(0)',
      opacity: 1,
    })),
    transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
    transition('* => void, * => hidden', animate('100ms cubic-bezier(0.4, 0.0, 1, 1)', style({
      transform: 'translateY(10px)',
      opacity: 0,
    }))),
  ])
};
