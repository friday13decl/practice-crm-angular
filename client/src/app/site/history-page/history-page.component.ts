import {Component, OnDestroy, OnInit} from '@angular/core';
import {IOrdersService} from '@core/services/orders.service';
import {Subscription} from 'rxjs';
import {Order} from '@shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  isFilterVisible = false;
  offset = 0;
  limit = STEP;
  subs: Array<Subscription> = [];
  orders: Array<Order> = [];
  reloading = false;
  loading = false;
  noMoreOrders = false;

  constructor(private ordersService: IOrdersService) {
  }

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  private fetch(): void {
    const params = {
      offset: this.offset,
      limit: this.limit
    };
    this.subs.push(this.ordersService.fetch(params).subscribe(
      orders => {
        this.orders = [...this.orders, ...orders];
        this.noMoreOrders = orders.length < STEP;
      },
      err => {},
      () => {
        this.loading = false;
        this.reloading = false;
      }
    ));
  }

  showMore(): void {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
