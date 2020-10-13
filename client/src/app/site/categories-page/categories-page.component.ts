import { Component, OnInit } from '@angular/core';
import {ICategoriesService} from "@core/services/categories.service";
import {Category} from "@shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Array<Category>>;

  constructor(private categoriesService: ICategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
  }

}
