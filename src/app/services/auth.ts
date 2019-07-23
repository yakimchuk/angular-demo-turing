import { Injectable } from '@angular/core';
import { EndpointGatewayService, Endpoint } from '@app/services/endpoint';
import { AuthenticationToken } from '@app/services/schemas.turing';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { api, navigation } from '@app/config';
import { StorageService, UserStorage } from '@app/services/storage';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash';

// AuthenticationService gateway
export interface AuthenticationService {

  // Authenticate user
  login(options: { email: string, password: string }): Promise<any>;

  // Forget authentication credentials
  logout(): Promise<any>;

  // Check is user now authenticated
  isAuthenticated(): boolean;
}

@Injectable()
export class Auth implements AuthenticationService, HttpInterceptor {

  private resources: EndpointGatewayService;
  private token: AuthenticationToken;
  private store: StorageService<string, string>;
  private router: Router;

  private key = `${this.constructor.name}_token`;

  constructor(
    resources: Endpoint,
    store: UserStorage,
    router: Router
  ) {

    this.resources = resources;
    this.store = store;
    this.router = router;

    this.restoreToken();
  }

  private async restoreToken() {

    try {

      if (!this.store.has(this.key)) {
        return;
      }

      this.token = this.store.get(this.key);

    } catch {
      // If there an error while the retrieval of a stored key, then silent exception handling is an acceptable variant
    }
  }

  public isAuthenticated() {
    return !!this.token;
  }

  async login(options: { email: string, password: string }) {
    this.token = await this.resources.auth.login(options);
    this.store.set(this.key, this.token);
  }

  // @todo: Implement remote logout when it will be present on the server
  async logout() {

    delete this.token;

    try {
      this.store.remove(this.key);
    } catch {
      // Issue with storage, but it is exceptional case, in this case silence will be better, than errors at logout
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req;

    // If we send request to the endpoint and we have an access token, then we must add it into the headers, otherwise we will not be
    // authenticated on the server and all our private requests will fail
    if (_.isString(this.token) && _.startsWith(request.url, api.endpoint)) {
      request = req.clone({
        headers: new HttpHeaders({
          // Is not an error, headers may be in any case by standard, and lower-case headers are also a good practice
          'user-key': this.token
        })
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // @todo: Rewrite this strange variable path, now error var + error interface prop + error prop in response = error.error.error
        if (error.status === 500 && error.error.error.includes('TokenExpiredError')) {
          this.router.navigateByUrl(navigation.loginRedirectUrl);
        }

        return throwError(error);
      })
    );

  }

}
