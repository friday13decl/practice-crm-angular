import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {IPositionsService} from '@core/services/positions.service';
import {Observable} from 'rxjs';
import {Position} from '@shared/interfaces';
import {switchMap, tap} from 'rxjs/operators';
import {OrderService} from '../order.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cost', 'amount', 'add'];

  positions$: Observable<Array<Position>>;
  quantity: {[key: string]: number} = {};

  constructor(private route: ActivatedRoute,
              private positionsService: IPositionsService,
              private orderService: OrderService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.positions$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.positionsService.fetch(params.get('id'));
        }
      }),
      tap(positions => {
        positions.forEach((p, index) => this.quantity[index] = 1);
      })
    );
  }

  add(position: Position, quantity: number): void {
    this.orderService.add(position, quantity);
    this.showToast(`${position.name} was added to order in amount of ${quantity}`);
  }

  showToast(msg: string): void {
    this.snackbar.open(msg, null, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
