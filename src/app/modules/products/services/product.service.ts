import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getProducts(filter?) {
    return this.http.get(this.baseUrl);
  }

  getProduct(productId) {
    return this.http.get(`${this.baseUrl}/${productId}`);
  }

  createProduct(product) {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(product, productId) {
    return this.http.patch(`${this.baseUrl}/${productId}`, product);
  }

  deleteProduct(productId) {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
