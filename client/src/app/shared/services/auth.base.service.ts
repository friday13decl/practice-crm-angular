import {Injectable} from '@angular/core';
import {User} from "../interfaces";
import {Observable} from "rxjs";

export type LoginResponse = { token: string };

@Injectable()
export abstract class AuthBaseService {
  abstract register(user: User): Observable<User>

  abstract login(user: User): Observable<LoginResponse>

  abstract setToken(token: string): void

  abstract getToken(): string

  abstract isAuthenticated(): boolean

  abstract logout(): void
}
