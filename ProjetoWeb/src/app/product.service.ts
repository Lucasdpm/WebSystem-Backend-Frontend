import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthHttpService } from './auth-http.service';

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
  
  constructor(private http: AuthHttpService) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.url)
  }

  getProductById(id: number): Observable<Product>{
    const url = `${this.url}/${id}`
    return this.http.get<Product>(url)
  }

  addProduct(newProduct: Product): Observable<any>{
    return this.http.post<Product>(this.url, newProduct, this.httpOptions)
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.url}/${id}`
    return this.http.delete(url, { responseType: 'text' })
  }

  updateProduct(id: number, updateProduct: Product): Observable<any> {
    const url = `${this.url}/${id}`
    return this.http.put(url, updateProduct, this.httpOptions)
  }
}
