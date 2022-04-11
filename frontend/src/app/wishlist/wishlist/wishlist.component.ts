import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  products: any;

  constructor(
    private _wishlistService: WishlistService,
    private _router: Router,
    private _productService: ProductService
  ) {
    this.products = [];
  }

  ngOnInit(): void {}

  deleteWishlist(product: any) {
    this._wishlistService
      .deleteWishlist(product)
      .subscribe((data) => {
        this.products = this.products.filter((p: { _id: any; }) => p._id !== product._id);
      });
  }

  updateWishlist(product: any) {
    this._wishlistService
      .updateWishlist(product)
      .subscribe((data) => {
        this.products = this.products.filter((p: { _id: any; }) => p._id !== product._id);
      });
  }

  addWishlist(product: any) {
    this._wishlistService.addWishlist(product).subscribe(
      (res: any) => {
        this.products = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
