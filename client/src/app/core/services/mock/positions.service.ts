import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Position, ServerMessage} from '@shared/interfaces';
import {IPositionsService} from '../positions.service';
import {delay} from 'rxjs/operators';

@Injectable()
export class PositionsServiceMock implements IPositionsService {

  private count = 0;

  private positions: Array<Position> = [
    {
      _id: (++this.count) + '',
      name: 'Position 1',
      cost: 25,
      category: ''
    },
    {
      _id: (++this.count) + '',
      name: 'Position Number 5',
      cost: 45,
      category: ''
    }
  ];

  constructor() {
  }

  fetch(categoryId: string): Observable<Array<Position>> {
    return of(this.positions).pipe(delay(1000));
  }

  create(position: Position): Observable<Position> {
    const newPosition: Position = {...position, _id: (++this.count) + ''};
    this.positions.push(newPosition);
    return of(newPosition).pipe(delay(1000));
  }

  update(position: Position): Observable<Position> {
    const idx = this.positions.findIndex(p => p._id === position._id);
    this.positions[idx] = position;
    return of(position).pipe(delay(1000));
  }

  delete(position: Position): Observable<ServerMessage> {
    this.positions = this.positions.filter(p => p._id !== position._id);
    return of({message: 'Position was removed'}).pipe(delay(1000));
  }

}
