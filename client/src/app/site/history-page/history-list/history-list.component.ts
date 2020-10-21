import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Order} from '@shared/interfaces';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() orders: Array<Order>;
  @ViewChild('dialogContainer') dialogContainer: TemplateRef<any>;
  selectedOrder: Order;
  displayedColumns: string[] = ['title', 'amount', 'price'];
  displayedColumnsFooter: string[] = ['title', 'price'];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  computePrice(order: Order): number {
    return order.list.reduce((acc, item) => {
      return acc += item.cost * item.quantity;
    }, 0);
  }

  openDetails(order: Order): void {
    this.selectedOrder = order;
    this.dialog.open(this.dialogContainer, {
      width: '600px'
    });
  }

}
