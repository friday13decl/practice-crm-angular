import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

export type LoginResponse = {token: string};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = null;

  constructor(private http: HttpClient) { }

  register() {}

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', user)
      .pipe(tap(({token}) => {
        localStorage.setItem('auth-token', token);
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
    localStorage.removeItem('auth-token');
  }

}
