import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {OrderService} from './order.service';
import {OrderItem} from '@shared/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subscription} from 'rxjs';
import {IOrdersService} from '@core/services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy {

  @ViewChild('dialogContainer') dialogContainer: TemplateRef<any>;

  order: Array<OrderItem>;
  total$: Observable<number>;
  subs: Array<Subscription> = [];

  isRoot: boolean;
  pending = false;
  displayedColumns: string[] = ['title', 'amount', 'price', 'delete'];
  displayedColumnsFooter: string[] = ['title', 'price'];

  constructor(private router: Router,
              private dialog: MatDialog,
              private orderService: OrderService,
              private ordersService: IOrdersService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.subs.push(this.orderService.order$.subscribe(order => this.order = order));
    this.total$ = this.orderService.total$;
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  onComplete(): void {
    const dialogRef = this.dialog.open(this.dialogContainer, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pending = true;
        this.subs.push(this.ordersService.create(this.order).subscribe(
          order => {
            this.orderService.clear();
            this.showToast(`Order #${order.order} was created`);
          },
          err => this.showToast(err.error.message),
          () => this.pending = false
        ));
      }
    });
  }

  onDelete(item: OrderItem): void {
    this.orderService.delete(item);
  }

  showToast(msg: string): void {
    this.snackbar.open(msg, null, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
