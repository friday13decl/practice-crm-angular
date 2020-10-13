import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Category} from "@shared/interfaces";
import {CategoriesServiceImpl} from "./impl/categories.service";
import {CategoriesServiceMock} from "./mock/categories.service";

@Injectable({
  providedIn: 'root',
  useClass: CategoriesServiceMock
})
export abstract class ICategoriesService {
  abstract fetch(): Observable<Array<Category>>
}
