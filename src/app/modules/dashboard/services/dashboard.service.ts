import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  productsUrl = 'http://localhost:3000/products?_page=1&_limit=1';
  constructor(private http: HttpClient) {}

  getProductsCount() {
    return this.http.get(this.productsUrl, { observe: 'response' });
  }
}
