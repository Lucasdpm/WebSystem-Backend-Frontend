import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = `${environment.MainUrl}/product`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(this.url)
  }

  getProductById(id: number): Observable<Product>{
    const url = `${this.url}/${id}`
    return this.httpClient.get<Product>(url)
  }

  addProduct(newProduct: Product): Observable<any>{
    return this.httpClient.post<Product>(this.url, newProduct, this.httpOptions)
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.url}/${id}`
    return this.httpClient.delete(url, { responseType: 'text' })
  }

  updateProduct(id: number, updateProduct: Product): Observable<any> {
    const url = `${this.url}/${id}`
    return this.httpClient.put(url, updateProduct, this.httpOptions)
  }
}
