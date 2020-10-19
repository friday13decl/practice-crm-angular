import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '@shared/interfaces';
import {environment} from '@env';
import {AuthServiceImpl} from './impl/auth.service';
import {AuthServiceMock} from './mock/auth.service';

export type LoginResponse = { token: string };

@Injectable({
  providedIn: 'root',
  useClass: environment.mockServices ? AuthServiceMock : AuthServiceImpl
})
export abstract class IAuthService {
  abstract register(user: User): Observable<User>;

  abstract login(user: User): Observable<LoginResponse>;

  abstract setToken(token: string): void;

  abstract getToken(): string;

  abstract isAuthenticated(): boolean;

  abstract logout(): void;
}
