import {IOrdersService} from '@core/services/orders.service';
import {Order, OrderItem} from '@shared/interfaces';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class OrdersServiceImpl implements IOrdersService {

  constructor(private http: HttpClient) {
  }

  create(items: Array<OrderItem>): Observable<Order> {
    return this.http.post<Order>('/api/order', {
      list: items.map(item => ({
        name: item.name,
        cost: item.position.cost,
        quantity: item.quantity
      }))
    });
  }
}
