import {Injectable, Provider} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
const {apiURL} = environment;

@Injectable({
  providedIn: "root"
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private router:Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (req.url.startsWith('/api')) {
    //   return next.handle(req.clone({
    //     url: req.url.replace('/api',apiURL),
    //     withCredentials:true
    //   }))
    // }

    if (req.url.startsWith('clothesId/')){

      let reqStream$ = next.handle(req);

      reqStream$ = next.handle(req.clone({
        url: req.url.replace('clothesId/',''),
        withCredentials: true,
        responseType: 'json'
      }))

      return reqStream$.pipe(catchError(err => {
        this.router.navigate(['/error']);
        return [err];
      }));

    }

    return next.handle(req.clone({
      withCredentials: true,
      responseType: 'json'
    }));
  }

}

export const AppHttpInterceptorProvide: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppHttpInterceptor,
  multi: true
}
