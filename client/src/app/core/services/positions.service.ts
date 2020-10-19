import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Position, ServerMessage} from '@shared/interfaces';
import {environment} from '@env';
import {PositionsServiceImpl} from '@core/services/impl/positions.service';
import {PositionsServiceMock} from '@core/services/mock/positions.service';

@Injectable({
  providedIn: 'root',
  useClass: environment.mockServices ? PositionsServiceMock : PositionsServiceImpl
})
export abstract class IPositionsService {

  abstract fetch(categoryId: string): Observable<Array<Position>>;

  abstract create(position: Position): Observable<Position>;

  abstract update(position: Position): Observable<Position>;

  abstract delete(position: Position): Observable<ServerMessage>;
}
