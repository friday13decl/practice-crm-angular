import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderFilter} from '@shared/interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<OrderFilter>();
  startDate: Date;
  endDate: Date;
  order: number;
  isValid = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  dateChangeHandler(): void {
    if (!this.startDate || !this.endDate) {
      this.isValid = true;
      return;
    }
    this.isValid = this.startDate < this.endDate;
  }

  submitFilter(): void {
    const filter: OrderFilter = {};
    if (this.order) {
      filter.order = this.order;
    }
    if (this.startDate) {
      filter.start = this.startDate;
    }
    if (this.endDate) {
      filter.end = this.endDate;
    }

    this.filterChanged.emit(filter);
  }

}
