import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  today;
  productData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _productService: ProductService,
    private _wishlistService: WishlistService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.productData = {};
    this.today = moment().locale('es').format('dddd MMM D');
  }

  ngOnInit(): void {
    this._productService.listProducts().subscribe({
      next: (v) => {
        this.productData = v.productList;
      },
      error: (err) => {
        this.message = err.error.message;
        this.openSnackBarError();
      },
      complete: () => console.info('completed'),
    });
  }

  addWishlist(product: any) {
    this._wishlistService.addWishlist(product).subscribe(
      (res: any) => {
        this.productData = res;
        this.openSnackBarSuccessfull();
        this._router.navigate(['/wishlist']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  openSnackBarSuccessfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
