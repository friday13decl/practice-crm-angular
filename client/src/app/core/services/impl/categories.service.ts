import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICategoriesService} from "../categories.service";
import {Category} from "@shared/interfaces";
import {Observable} from "rxjs";

@Injectable()
export class CategoriesServiceImpl implements ICategoriesService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('/api/category');
  }
}
