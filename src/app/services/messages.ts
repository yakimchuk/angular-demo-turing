import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';

export interface IMessages {
  openFromTemplate(template: TemplateRef<any>): any;
}

@Injectable()
export class UserMessages implements IMessages {

  private toasts: MatSnackBar;

  constructor(toasts: MatSnackBar) {
    this.toasts = toasts;
  }

  openFromTemplate(template: TemplateRef<any>) {
    this.toasts.openFromTemplate(template);
  }
}
