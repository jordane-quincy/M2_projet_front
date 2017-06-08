import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import { TokenService } from '../providers/token-service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  private tokenService: TokenService;

  constructor (backend: XHRBackend, options: RequestOptions, tokenService: TokenService) {
    super(backend, options);
    this.tokenService = tokenService;
  }

  request(request: Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = this.tokenService.getToken();
    if (!request.headers) {
      request.headers = new Headers([]);
    }
    request.headers.append('Authorization', token);
    request.headers.append('Content-Type', 'application/json');
    return super.request(request, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpService) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        console.log("Erreur 401 ou 403");
      }
      return Observable.throw(res);
    };
  }

}
