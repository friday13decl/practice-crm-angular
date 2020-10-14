import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <mat-spinner color="accent" strokeWidth="3"
                 diameter="70">
    </mat-spinner>`,
  styles: ['mat-spinner { margin: 50px auto; }']
})
export class LoaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
