import { ElementRef } from '@angular/core';

export interface AnimationManager {
  toggle(el: ElementRef, stateName: string, state: boolean, immediate: boolean): void;
}
