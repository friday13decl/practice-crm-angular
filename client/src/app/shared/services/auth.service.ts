import {Injectable} from '@angular/core';
import {User} from "../interfaces";
import {Observable} from "rxjs";
import {AuthServiceImpl} from "./impl/auth.service";
import {AuthServiceMock} from "./mock/auth.service";

export type LoginResponse = { token: string };

@Injectable({
  providedIn: 'root',
  useClass: AuthServiceMock
})
export abstract class IAuthService {
  abstract register(user: User): Observable<User>

  abstract login(user: User): Observable<LoginResponse>

  abstract setToken(token: string): void

  abstract getToken(): string

  abstract isAuthenticated(): boolean

  abstract logout(): void
}
