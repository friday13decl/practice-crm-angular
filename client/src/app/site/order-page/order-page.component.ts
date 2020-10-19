import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {OrdersService} from './orders.service';
import {OrderItem} from '@shared/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrdersService]
})
export class OrderPageComponent implements OnInit {

  @ViewChild('dialogContainer') dialogContainer: TemplateRef<any>;

  isRoot: boolean;
  displayedColumns: string[] = ['title', 'amount', 'price', 'delete'];
  displayedColumnsFooter: string[] = ['title', 'price'];

  constructor(private router: Router,
              private dialog: MatDialog,
              private ordersService: OrdersService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
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
      }
    });
  }

  onDelete(item: OrderItem): void {
    this.ordersService.delete(item);
  }

  showToast(msg: string): void {
    this.snackbar.open(msg, null, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
