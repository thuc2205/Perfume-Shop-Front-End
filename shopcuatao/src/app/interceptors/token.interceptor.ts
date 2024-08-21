  import { Injectable } from '@angular/core';
  import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { TokenService } from '../service/token.service';

  @Injectable()
  export class TokenInterCeptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}
    //trên đường bay đi thì thêm gì vào
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token = this.tokenService.getToken();
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return next.handle(req);
    }
    // đăng kí interceptor cho module
  }
