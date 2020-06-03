import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from './TokenService';
import {timeout} from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {
  }

  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addTokenToRequest(request)).pipe(timeout(300000));
  }

  private addTokenToRequest(request: HttpRequest<any>) {
    return request.clone({
      setParams: {
        token: this.tokenService.generateTokenIfNotExists()
      }
    });
  }
}
