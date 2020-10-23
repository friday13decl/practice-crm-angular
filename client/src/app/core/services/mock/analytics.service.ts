import {IAnalyticsService} from '@core/services/analytics.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AnalyticsData, OverviewData} from '@shared/interfaces';
import {delay} from 'rxjs/operators';

@Injectable()
export class AnalyticsServiceMock implements IAnalyticsService {

  overviewData: OverviewData = {
    gain: {
      percent: 20,
      compare: 15,
      yesterday: 33,
      isHigher: true
    },
    orders: {
      percent: 5,
      compare: 8,
      yesterday: 12,
      isHigher: false
    }
  };

  analyticsData: AnalyticsData = {
    average: 150,
    chart: [
      {
        label: '18.10.2020',
        gain: 300,
        orders: 3
      },
      {
        label: '20.10.2020',
        gain: 480,
        orders: 8
      },
      {
        label: '21.10.2020',
        gain: 275,
        orders: 4
      }
    ]
  };

  getOverview(): Observable<OverviewData> {
    return of(this.overviewData).pipe(delay(1000));
  }

  getAnalytics(): Observable<AnalyticsData> {
    return of(this.analyticsData).pipe(delay(1000));
  }

}
