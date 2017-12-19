import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the InterceptorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InterceptorServiceProvider implements HttpInterceptor{

  constructor(public http: HttpClient) {
    console.log('Hello InterceptorServiceProvider Provider');
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token != null)
    {      req = req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + token)
    });
      return next.handle(req);
    }else
      return next.handle(req);
  }
}
