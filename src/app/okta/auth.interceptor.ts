import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private oktaAuth: OktaAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> { 
    // Only add an access token to whitelisted origins
    const allowedOrigins = ['http://http://chanin-food-api.us-east-2.elasticbeanstalk.com'];
    if (allowedOrigins.some(url => request.urlWithParams.includes(url))) {
      if(request.method.toString() != 'GET'){
        const accessToken = await this.oktaAuth.getAccessToken();
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + accessToken
          }
        });
      }
    }
    return next.handle(request).toPromise();
  }
}
