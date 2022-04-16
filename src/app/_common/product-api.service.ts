import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {ResponseEvent} from "../_models/core.model";
import {Product} from "../_models/product.model";

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private apiPrefix = environment.baseApiPrefix;

  private httpHeaderJson = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.httpClient.get(`${this.apiPrefix}/products`);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiPrefix}/products/${id}`);
  }

  create(item: Product): Observable<any> {
    const obj = item.toRequestObject();
    obj.id = null;
    return this.httpClient.post(`${this.apiPrefix}/products`, obj);
  }

  update(id: number, item: Product): Observable<any> {
    const obj = item.toRequestObject();
    return this.httpClient.put(`${this.apiPrefix}/products/${id}`, obj);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiPrefix}/products/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(`${this.apiPrefix}/products`);
  }

  findByCode(code: string): Observable<any> {
    return this.httpClient.get(`${this.apiPrefix}?code=${code}`);
  }
}
