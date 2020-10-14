import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICategoriesService} from '../categories.service';
import {Category, ServerMessage} from '@shared/interfaces';
import {Observable} from 'rxjs';

@Injectable()
export class CategoriesServiceImpl implements ICategoriesService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>('/api/category');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`);
  }

  create(name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.post<Category>('/api/category', fd);
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.patch<Category>(`/api/category/${id}`, fd);
  }

  delete(id: string): Observable<ServerMessage> {
    return this.http.delete<ServerMessage>(`/api/category/${id}`);
  }
}
