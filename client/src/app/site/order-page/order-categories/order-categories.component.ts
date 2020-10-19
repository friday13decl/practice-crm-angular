import { Component, OnInit } from '@angular/core';
import {ICategoriesService} from '@core/services/categories.service';
import {Observable} from 'rxjs';
import {Category} from '@shared/interfaces';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Array<Category>>;

  constructor(private categoriesService: ICategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
  }

}
