import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private env: string

  constructor(private _http: HttpClient) { this.env = environment.APP_URL }

  getWishlist = (userId: string) => {
    return this._http.get<any>(this.env + '/api/wishlist/getWishlist/' + userId);
  }

  addWishlist = (wishlist: any) => {
    return this._http.post<any>(this.env + '/api/wishlist/addWishlist', wishlist);
  }

  deleteWishlist = (wishlist: any) => {
    return this._http.delete<any>(this.env + '/api/wishlist/deleteWishlist/' + wishlist._id);
  }

  updateWishlist = (wishlist: any) => {
    return this._http.put<any>(this.env + '/api/wishlist/updateWishlist', wishlist);
  }
}
