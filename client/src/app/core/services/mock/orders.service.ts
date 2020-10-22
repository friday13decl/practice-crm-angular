import {IOrdersService} from '@core/services/orders.service';
import {Order, OrderItem} from '@shared/interfaces';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class OrdersServiceMock implements IOrdersService {

  orders: Array<Order> = [
    {
      date: '2020-05-07T08:30:00.580Z',
      order: 3,
      list: [
        {
          name: 'Position 111',
          quantity: 8,
          cost: 15
        },
        {
          name: 'Position 222',
          quantity: 2,
          cost: 25
        }
      ]
    },
    {
      date: '2019-04-06T20:05:12.580Z',
      order: 2,
      list: [
        {
          name: 'Position 555',
          quantity: 4,
          cost: 30
        },
        {
          name: 'Position 777',
          quantity: 2,
          cost: 22
        }
      ]
    },
    {
      date: '2018-03-05T15:05:12.580Z',
      order: 1,
      list: [
        {
          name: 'Position 999',
          quantity: 4,
          cost: 45
        }
      ]
    }
  ];

  constructor() {
  }

  create(items: Array<OrderItem>): Observable<Order> {
    return of({
      list: items,
      order: 3450953
    }).pipe(delay(1000));
  }

  fetch(params: any): Observable<Array<Order>> {
    const {offset, limit, order, start, end} = params;
    let filtered: Array<Order> = this.orders.filter(item => {
      if (order && item.order !== order) {
        return false;
      }
      return true;
    });
    filtered = filtered.slice(offset, offset + limit);
    return of(filtered).pipe(delay(1000));
  }
}
