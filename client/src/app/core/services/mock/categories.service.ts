import {Injectable} from '@angular/core';
import {ICategoriesService} from "../categories.service";
import {Observable, of} from "rxjs";
import {Category} from "@shared/interfaces";
import {delay} from "rxjs/operators";

@Injectable()
export class CategoriesServiceMock implements ICategoriesService {

  constructor() {
  }

  fetch(): Observable<Array<Category>> {
    return of([{_id: '111',name: 'Category 1'}, {_id: '222', name: 'Category 2'}])
      .pipe(delay(2000));
  }
}
