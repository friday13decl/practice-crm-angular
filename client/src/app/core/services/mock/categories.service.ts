import {Injectable} from '@angular/core';
import {ICategoriesService} from '../categories.service';
import {fromEvent, Observable, of} from 'rxjs';
import {Category, ServerMessage} from '@shared/interfaces';
import {delay, switchMap} from 'rxjs/operators';

@Injectable()
export class CategoriesServiceMock implements ICategoriesService {

  private count = 0;

  private categories: Array<Category> = [
    {
      _id: (++this.count) + '',
      name: 'Category 1',
      imageSrc: 'https://s3.kincustom.com/uploads/product_3ddesign/20180727/f3701ab76e4772561695d774eb34b2bb.png'
    },
    {
      _id: (++this.count) + '',
      name: 'Category 2',
      imageSrc: 'https://pbs.twimg.com/media/DgCnE2mU0AYwuaz.jpg'
    }
  ];

  constructor() {
  }

  fetch(): Observable<Array<Category>> {
    return of(this.categories).pipe(delay(1000));
  }

  getById(id: string): Observable<Category> {
    return of(this.categories.find(c => c._id === id)).pipe(delay(1000));
  }

  create(name: string, image?: File): Observable<Category> {
    let imageSrc = null;

    if (image) {
      const reader = new FileReader();
      const obs$ = fromEvent(reader, 'load').pipe(
        switchMap(() => {
          imageSrc = reader.result;
          const category: Category = {
            name, imageSrc, _id: (++this.count) + ''
          };
          this.categories.push(category);
          return of(category).pipe(delay(1000));
        })
      );
      reader.readAsDataURL(image);
      return obs$;
    } else {
      const category: Category = {
        name, imageSrc, _id: (++this.count) + ''
      };
      this.categories.push(category);
      return of(category).pipe(delay(1000));
    }
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const idx = this.categories.findIndex(c => c._id === id);
    this.categories[idx] = {...this.categories[idx], name};
    return of(this.categories[idx]).pipe(delay(1000));
  }

  delete(id: string): Observable<ServerMessage> {
    this.categories = this.categories.filter(c => c._id !== id);
    return of({message: 'Category was removed'}).pipe(delay(1000));
  }
}
