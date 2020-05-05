import {Injectable} from '@angular/core';
import * as uuid from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public generateTokenIfNotExists(): string {
    if (localStorage.getItem('token') === null) {
      localStorage.setItem('token', uuid.v4());
    }

    return localStorage.getItem('token');
  }
}
