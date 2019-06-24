import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: 'inherit',
        opacity: 1
      })
    ], { optional: true }),
    group([
      query(':enter', [
        style({
          transform: 'translateX(1600px)',
          opacity: 0
        }),
        animate('1s ease-in-out', style({
          transform: 'translateX(0%)',
          opacity: 1
        }))
      ], { optional: true }),
      query(':leave', [
        style({
          transform: 'translateY(0%)',
          opacity: 1
        }),
        animate('1s ease-in-out', style({
          transform: 'translateY(1024px)',
          opacity: 0
        }))
      ], { optional: true }),
    ])
  ])
]);

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

export const slideRight = trigger('slideRight', [
  state('open', style({
    opacity: 1
  })),
  state('closed', style({
    opacity: 0,
    width: 0,
    paddingRight: 0,
    paddingLeft: 0,
    marginRight: 0,
    marginLeft: 0,
    overflow: 'hidden',
    minWidth: 0
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
    opacity: 1,
    overflow: 'hidden'
  })),
  state('closed', style({
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    overflow: 'hidden',
    minHeight: 0
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
