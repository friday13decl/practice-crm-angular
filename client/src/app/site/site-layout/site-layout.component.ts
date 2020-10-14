import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IAuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  opened = true;
  isMenuHidden = true;

  links: Array<{url: string, name: string}> = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'New order'},
    {url: '/categories', name: 'Positions'}
  ];

  constructor(private auth: IAuthService,
              private route: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  logout(event): void {
    event.preventDefault();
    this.auth.logout();
    this.route.navigate(['/login']);
  }

}
