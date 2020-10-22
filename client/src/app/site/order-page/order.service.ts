import {Injectable} from '@angular/core';
import {OrderItem, Position} from '@shared/interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class OrderService {

  order: Array<OrderItem> = [];
  total = 0;

  order$: BehaviorSubject<Array<OrderItem>> = new BehaviorSubject(this.order);
  total$: BehaviorSubject<number> = new BehaviorSubject(this.total);

  add(position: Position, quantity: number): void {
    const {name, cost, _id} = position;
    const same = this.order.findIndex(item => item.position_id === _id);
    if (same >= 0) {
      this.order[same].quantity += quantity;
    } else {
      this.order.push({position_id: _id, quantity, cost, name});
    }
    this.total += quantity * cost;
    this.order$.next(this.order);
    this.total$.next(this.total);
  }

  delete(candidate: OrderItem): void {
    this.order = this.order.filter(item => {
      if (item.position_id === candidate.position_id) {
        this.total -= item.quantity * item.cost;
        this.total$.next(this.total);
        return false;
      }
      return true;
    });
    this.order$.next(this.order);
  }

  clear(): void {
    this.order = [];
    this.total = 0;
    this.total$.next(this.total);
    this.order$.next(this.order);
  }
}
