import {IOrdersService} from '@core/services/orders.service';
import {Order, OrderItem} from '@shared/interfaces';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class OrdersServiceMock implements IOrdersService {

  constructor() {
  }

  create(items: Array<OrderItem>): Observable<Order> {
    return of({
      list: items,
      order: 3450953
    }).pipe(delay(1000));
  }
}
