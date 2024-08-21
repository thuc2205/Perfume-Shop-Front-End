import { evironment } from './../enviroment/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetProduct = `${evironment.apiBaseUrl}/categories`; // Sửa tên biến environment

  constructor(private http: HttpClient) {}

  getCategories(page: number, limit: number): Observable<Category[]> {
    const params = new HttpParams()
      .set("page", page.toString()) 
      .set("limit", limit.toString()); 

    return this.http.get<Category[]>(this.apiGetProduct, { params });
  }
}
