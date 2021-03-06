import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError} from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = 'api/categories';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    );
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(() => category));
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null));
  }

  private handleError(error: any): Observable<any> {
    console.log('ERRO na REquisição =>', error);
    return throwError(error);
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(elemtent => categories.push(elemtent as Category));
    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }
}
