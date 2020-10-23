import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IAnalyticsService} from '@core/services/analytics.service';
import {Chart, ChartConfiguration} from 'chart.js';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gain') gain: ElementRef;
  @ViewChild('orders') orders: ElementRef;

  average: number;
  pending = true;
  subs: Array<Subscription> = [];

  constructor(private analyticsService: IAnalyticsService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      color: 'rgb(255, 99, 132)'
    };

    const ordersConfig: any = {
      color: 'rgb(54, 162, 235)'
    };

    this.subs.push(this.analyticsService.getAnalytics().subscribe(data => {
      this.average = data.average;
      gainConfig.labels = data.chart.map(i => i.label);
      gainConfig.data = data.chart.map(i => i.gain);

      ordersConfig.labels = gainConfig.labels;
      ordersConfig.data = data.chart.map(i => i.orders);

      const gainCtx = this.gain.nativeElement.getContext('2d');
      const ordersCtx = this.orders.nativeElement.getContext('2d');

      gainCtx.canvas.height = '300px';
      ordersCtx.canvas.height = '300px';

      const chartGain = new Chart(gainCtx, createChartConfig(gainConfig));
      const chartOrders = new Chart(ordersCtx, createChartConfig(ordersConfig));

      this.gain.nativeElement.style.height = '300px';
      this.orders.nativeElement.style.height = '300px';

      this.pending = false;
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}

function createChartConfig({labels, data, color}): ChartConfiguration {
  return {
    type: 'line',
    options: {
      responsive: true,
      legend: {
        display: false
      }
    },
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: color,
          backgroundColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
