import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@env';
import {AnalyticsServiceImpl} from '@core/services/impl/analytics.service';
import {AnalyticsData, OverviewData} from '@shared/interfaces';
import {AnalyticsServiceMock} from '@core/services/mock/analytics.service';

@Injectable({
  providedIn: 'root',
  useClass: environment.mockServices ? AnalyticsServiceMock : AnalyticsServiceImpl
})
export abstract class IAnalyticsService {
  abstract getOverview(): Observable<OverviewData>;

  abstract getAnalytics(): Observable<AnalyticsData>;
}
