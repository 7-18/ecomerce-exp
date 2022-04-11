import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  productData: any;

  constructor(private _productService: ProductService, private _route: ActivatedRoute) {
    this.productData = {};
  }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    console.log(id);
    this._productService.findProduct(id).subscribe((res: any) => {
      this.productData = res;
    }
    );
  }
}
