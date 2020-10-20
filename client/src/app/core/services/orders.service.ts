import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@env';
import {Order, OrderItem} from '@shared/interfaces';
import {OrdersServiceImpl} from '@core/services/impl/orders.service';
import {OrdersServiceMock} from '@core/services/mock/orders.service';

@Injectable({
  providedIn: 'root',
  useClass: environment.mockServices ? OrdersServiceMock : OrdersServiceImpl
})
export abstract class IOrdersService {
  abstract create(items: Array<OrderItem>): Observable<Order>;
}
