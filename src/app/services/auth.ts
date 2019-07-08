import { Injectable } from '@angular/core';
import { IRemoteData, Resources } from '@app/services/resources';
import { IAccessToken } from '@app/services/schemas';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { api } from '@app/config';
import { IStorage, UserStorage } from '@app/services/storage';
import { catchError, tap } from 'rxjs/operators';
import { IUser, User } from '@app/services/user';
import { Router } from '@angular/router';

export interface IAuth {
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  isAuthorized(): boolean;
}

@Injectable()
export class Auth implements IAuth, HttpInterceptor {

  private resources: IRemoteData;
  private token: IAccessToken;
  private store: IStorage<string, string>;
  private router: Router;

  private key = `${this.constructor.name}_token`;

  constructor(resources: Resources, store: UserStorage, router: Router) {

    this.resources = resources;
    this.store = store;
    this.router = router;

    this.restoreToken();
  }

  private restoreToken() {

    if (!this.store.has(this.key)) {
      return;
    }

    this.token = this.store.get(this.key);
  }

  public isAuthorized() {
    return !!this.token;
  }

  async login(email: string, password: string) {
    this.token = await this.resources.auth.login(email, password);
    this.store.set(this.key, this.token);
  }

  async logout() {
    // @todo: Implement logout when it will be present on the server
    delete this.token;
    this.store.remove(this.key);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req;

    if (this.token && request.url.indexOf(api.endpoint) === 0) {
      request = req.clone({
        headers: new HttpHeaders({
          'user-key': this.token
        })
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 500 && error.error.error.includes('TokenExpiredError')) {
          this.router.navigateByUrl('/account?error=session');
        }

        return throwError(error);
      })
    );

  }

}
