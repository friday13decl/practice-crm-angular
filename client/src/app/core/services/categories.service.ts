import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Category, ServerMessage} from '@shared/interfaces';
import {environment} from '@env';
import {CategoriesServiceImpl} from './impl/categories.service';
import {CategoriesServiceMock} from './mock/categories.service';

@Injectable({
  providedIn: 'root',
  useClass: environment.mockServices ? CategoriesServiceMock : CategoriesServiceImpl
})
export abstract class ICategoriesService {
  abstract fetch(): Observable<Array<Category>>;

  abstract getById(id: string): Observable<Category>;

  abstract create(name: string, image?: File): Observable<Category>;

  abstract update(id: string, name: string, image?: File): Observable<Category>;

  abstract delete(id: string): Observable<ServerMessage>;
}
