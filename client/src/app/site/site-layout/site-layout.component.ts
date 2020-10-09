import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthBaseService} from "../../shared/services/auth.base.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  opened: boolean = true;
  isMenuHidden: boolean = true;

  links: Array<{url: string, name: string}> = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'New order'},
    {url: '/categories', name: 'Positions'}
  ]

  constructor(private auth: AuthBaseService,
              private route: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  logout(event) {
    event.preventDefault();
    this.auth.logout();
    this.route.navigate(['/login']);
  }

}
