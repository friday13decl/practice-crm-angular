import {IAnalyticsService} from '@core/services/analytics.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {OverviewData} from '@shared/interfaces';
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

  getOverview(): Observable<OverviewData> {
    return of(this.overviewData).pipe(delay(1000));
  }

  getAnalytics(): void {
  }

}
