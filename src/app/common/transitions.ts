import { animate, state, style, transition, trigger } from '@angular/animations';

export const zoom = trigger('zoom', [
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0,
    transform: 'scale(0)'
  })),
  transition('open => closed', [
    animate('0.4s')
  ]),
  transition('closed => open', [
    animate('1s')
  ]),
]);

export const slideTop = trigger('slideTop', [
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    overflow: 'hidden'
  })),
  transition('open => closed', [
    animate('0.4s')
  ]),
  transition('closed => open', [
    animate('1s')
  ]),
]);

export const fade = trigger('fade', [
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0,
    visibility: 'hidden'
  })),
  transition('open => closed', [
    animate('0.4s')
  ]),
  transition('closed => open', [
    animate('1s')
  ]),
]);
