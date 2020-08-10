import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {

    private authToken = '1234567890';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authToken}`
            }
        });
        return next.handle(newRequest);
    }
}
