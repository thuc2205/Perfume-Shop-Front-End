import { evironment } from './../enviroment/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiGetProduct = `${evironment.apiBaseUrl}/products`; // Sửa tên biến environment

  constructor(private http: HttpClient) {}

  getProducts(
    keyword: string,
    categoryId: number,
    page: number,
    limit: number
  ): Observable<Product[]> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('category_id', categoryId.toString())
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Product[]>(this.apiGetProduct, { params });
  }

  getProductDetail(productId: number): Observable<any> { // Đặt kiểu trả về
    return this.http.get(`${evironment.apiBaseUrl}/products/${productId}`);
  }

  getProductsById(productIds: number[]): Observable<Product[]> {
    debugger;
    const params = new HttpParams().set('ids', productIds.join(','));
    return this.http.get<Product[]>(`http://localhost:8080/api/v1/products/by-ids`, { params });
  }
}
