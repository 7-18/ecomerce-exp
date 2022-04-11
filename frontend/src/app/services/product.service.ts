import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _id(_id: any) {
    throw new Error('Method not implemented.');
  }
  addToCart(product: any) {
    throw new Error('Method not implemented.');
  }
  private env: string;
  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  createProduct = (product: any) => {
    return this._http.post<any>(
      this.env + '/api/product/createProduct',
      product
    );
  };

  updateProduct = (product: any) => {
    return this._http.put<any>(
      this.env + '/api/product/updateProduct',
      product
    );
  };

  listProducts = () => {
    return this._http.get<any>(this.env + '/api/product/listProducts');
  };

  findProduct = (_id: any) => {
    return this._http.get<any>(this.env + '/api/product/findProduct/' + _id);
  };

  deleteProduct = (product: any) => {
    return this._http.delete<any>(
      this.env + '/api/product/deleteProduct/' + product._id
    );
  };
}
