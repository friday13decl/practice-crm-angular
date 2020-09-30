import {Injectable} from "@angular/core";
import {AuthBaseService} from "../services/auth.base.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthBaseService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }
    return next.handle(req);
  }
}
