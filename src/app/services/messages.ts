import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { ui } from '@app/config';

export interface IMessages {
  openFromTemplate(template: TemplateRef<any>): any;
}

@Injectable()
export class UserMessages implements IMessages {

  private toasts: MatSnackBar;

  private queue: TemplateRef<any>[] = [];
  private current: MatSnackBarRef<any>;

  constructor(toasts: MatSnackBar) {
    this.toasts = toasts;
  }

  private checkQueue() {

    if (this.queue.length === 0 || this.current) {
      return;
    }

    let value: TemplateRef<any> = this.queue.shift();

    this.current = this.toasts.openFromTemplate(value, {
      duration: ui.toasts.duration
    });

    this.current
      .afterDismissed()
      .subscribe(() => {
        setTimeout(() => {
          delete this.current;
          this.checkQueue()
        }, ui.toasts.delay);
      });

  }

  public openFromTemplate(template: TemplateRef<any>) {

    this.queue.push(template);
    this.checkQueue();

  }
}
