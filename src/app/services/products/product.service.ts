import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = "http://localhost:8088";

  constructor(private http:HttpClient) { }


  getProducts(keyword : string, page: number=1, size:number=6){
    return this.http.get(`${this.host}/products?nom_like=${keyword}&_page=${page}&_limit=${size}`, 
    {observe:'response', transferCache: {
      includeHeaders: ['X-Total-Count']}});
  }

  getProductsWithoutSize(){
    return this.http.get(`${this.host}/products`, 
    {observe:'response', transferCache: {
      includeHeaders: ['X-Total-Count']}});
  }

  getProductById(id: number) : Observable<Product>{
    return this.http.get<Product>(`${this.host}/products/${id}`);
  }

  deleteProduct(product : Product) {
    return this.http.delete<Product>(`${this.host}/products/${product.id}`);
  }

  addProduct(product : Product) : Observable<Product>{
    return this.http.post<Product>(`${this.host}/products`, product);
  }



}
