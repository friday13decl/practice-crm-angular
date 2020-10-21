import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <mat-spinner color="accent" strokeWidth="3"
                 diameter="70" [class.zero-margin]="zeroMargin">
    </mat-spinner>`,
  styles: [`mat-spinner { margin: 50px auto; }
            .zero-margin { margin-top: 0;}`]
})
export class LoaderComponent {
  @Input() zeroMargin = false;
}
