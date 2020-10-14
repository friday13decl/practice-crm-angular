import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Position, ServerMessage} from '@shared/interfaces';
import {IPositionsService} from '../positions.service';

@Injectable()
export class PositionsServiceImpl implements IPositionsService {

  constructor(private http: HttpClient) {
  }

  fetch(categoryId: string): Observable<Array<Position>> {
    return this.http.get<Array<Position>>(`/api/position/${categoryId}`);
  }

  create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position);
  }

  delete(position: Position): Observable<ServerMessage> {
    return this.http.delete<ServerMessage>(`/api/position/${position._id}`);
  }
}
