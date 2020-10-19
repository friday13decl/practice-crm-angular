import {Injectable} from '@angular/core';
import {OrderItem, Position} from '@shared/interfaces';

@Injectable()
export class OrdersService {

  order: Array<OrderItem> = [];
  total = 0;

  add(position: Position, quantity: number): void {
    const same = this.order.findIndex(item => item.position._id === position._id);
    if (same >= 0) {
      this.order[same].quantity += quantity;
    } else {
      this.order.push({position, quantity, price: position.cost * quantity});
    }
    this.total += quantity * position.cost;
  }

  delete(candidate: OrderItem): void {
    this.order = this.order.filter(item => {
      if (item.position._id === candidate.position._id) {
        this.total -= item.quantity * item.position.cost;
        return false;
      }
      return true;
    });
  }

  clear(): void {
    this.order = [];
    this.total = 0;
  }
}
