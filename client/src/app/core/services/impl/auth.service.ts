import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '@shared/interfaces';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {IAuthService, LoginResponse} from '../auth.service';

export const LOCAL_STORAGE_TOKEN_NAME = 'auth-token';

@Injectable()
export class AuthServiceImpl implements IAuthService {

  private token: string = null;

  constructor(private http: HttpClient) {
    const tokenFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    if (tokenFromLocalStorage) {
      this.setToken(tokenFromLocalStorage);
    }
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', user)
      .pipe(tap(({token}) => {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
        this.setToken(token);
      }));
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  }
}
