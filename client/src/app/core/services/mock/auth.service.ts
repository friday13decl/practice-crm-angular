import {Injectable} from '@angular/core';
import {IAuthService, LoginResponse} from '../auth.service';
import {User} from '@shared/interfaces';
import {Observable, of} from 'rxjs';

export const LOCAL_STORAGE_TOKEN_NAME = 'auth-token';

@Injectable()
export class AuthServiceMock implements IAuthService {

  private token: string = null;

  constructor() {
    const tokenFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    if (tokenFromLocalStorage) {
      this.setToken(tokenFromLocalStorage);
    }
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  login(user: User): Observable<LoginResponse> {
    const token = 'token from mock';
    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
    this.setToken(token);
    return of({token});
  }

  logout(): void {
    this.setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  }

  register(user: User): Observable<User> {
    return of({
      email: 'test@mock.com',
      password: 'test'
    });
  }

  setToken(token: string): void {
    this.token = token;
  }
}
