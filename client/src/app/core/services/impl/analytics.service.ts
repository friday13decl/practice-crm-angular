import {IAnalyticsService} from '@core/services/analytics.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {OverviewData} from '@shared/interfaces';

@Injectable()
export class AnalyticsServiceImpl implements IAnalyticsService {

  constructor(private http: HttpClient) {}

  getOverview(): Observable<OverviewData> {
    return this.http.get<OverviewData>('/api/analytics/overview');
  }

  getAnalytics(): void {
  }

}
