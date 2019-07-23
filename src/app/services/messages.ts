import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { ui } from '@app/config';
import { ComponentType } from '@angular/cdk/portal';

// Notification management interface
// Common interface
export interface MessagesService {
  openFromTemplate(template: TemplateRef<any>): any;
  openFromComponent(component: ComponentType<any>): any;
}

interface QueueItem {
  template?: TemplateRef<any>;
  component?: ComponentType<any>;
}

@Injectable()
export class UserMessages implements MessagesService {

  private toasts: MatSnackBar;
  private queue: QueueItem[] = [];
  private current: MatSnackBarRef<any>;

  constructor(toasts: MatSnackBar) {
    this.toasts = toasts;
  }

  private checkQueue() {

    if (this.current || this.queue.length === 0) {
      return;
    }

    let value: QueueItem = this.queue.shift();
    let options = { duration: ui.toasts.duration };

    try {
      if (value.component) {
        this.current = this.toasts.openFromComponent(value.component, options);
      } else if (value.template) {
        this.current = this.toasts.openFromTemplate(value.template, options);
      } else {
        this.checkQueue();
        return;
      }
    } catch {
      // If external module will fail, then queue must continue its work
      this.checkQueue();
      return;
    }

    let reset = () => {
      delete this.current;
      this.checkQueue();
    };

    let timer = () => setTimeout(reset, ui.toasts.delay);

    try {
      this.current
        .afterDismissed()
        .subscribe(timer);
    } catch {
      // If external module will fail, then queue must continue its work
      reset();
    }
  }

  public openFromTemplate(template: TemplateRef<any>) {

    this.queue.push({ template });
    this.checkQueue();
  }

  public openFromComponent(component: ComponentType<any>) {

    this.queue.push({ component });
    this.checkQueue();
  }
}
