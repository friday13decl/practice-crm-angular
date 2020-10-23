import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IAnalyticsService} from '@core/services/analytics.service';
import {Observable} from 'rxjs';
import {OverviewData} from '@shared/interfaces';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  @ViewChild('bottomSheet') bottomSheetContainer: TemplateRef<any>;
  overview$: Observable<OverviewData>;
  yesterday: Date;

  constructor(private analyticsService: IAnalyticsService,
              private bottomSheet: MatBottomSheet) {
  }

  ngOnInit(): void {
    this.overview$ = this.analyticsService.getOverview();
    this.yesterday = new Date();
    this.yesterday.setDate(new Date().getDate() - 1);
  }

  openInfo(): void {
    this.bottomSheet.open(this.bottomSheetContainer);
  }

}
