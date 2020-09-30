import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {AuthBaseService} from "./auth.base.service";

export type LoginResponse = { token: string };
const LOCAL_STORAGE_TOKEN_NAME: string = 'auth-token';

@Injectable()
export class AuthService implements AuthBaseService {

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

  setToken(token: string) {
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
