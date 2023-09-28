import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { ThemeService } from 'src/app/services/theme.service';
import { productAddHistory, productDetails } from '../../history/history.component';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss']
})
export class SellProductComponent {
  /*========== Services ==========*/
  _themeService = inject(ThemeService);
  _fb = inject(FormBuilder);
  _CrudService = inject(CrudService);
  _authService = inject(AuthService);
  _route = inject(ActivatedRoute);


  SellProduct!: FormGroup;
  ProductId: any;

  ngOnInit(): void {
    this.SellProduct = this._fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      Email: ['', Validators.compose([Validators.email, Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      productName: ['', Validators.compose([Validators.required])],
      productSize: ['', Validators.compose([Validators.required])],
      Quantity: ['', Validators.compose([Validators.required])],
    })

    this.GetProductId();
    this.GetProducts();
  }

  AllProducts: productDetails[] = new Array<productDetails>;
  GetProducts() {
    this._CrudService.GetProduct().subscribe({
      next: (res: any) => {
        this.AllProducts = res;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.warn('data get Success Fully');
      },
    })
  }

  GetProductId() {
    this._route.queryParams.subscribe(res => {
      this.ProductId = res;
    })
  }


  SellProductDetails: any;
  AddProductHistory: productAddHistory[] = new Array<productAddHistory>;
  sellProduct() {
    this.GetProductId();
    this.SellProductDetails = this.AllProducts.filter((data: any) => (data.id == this.ProductId.id));
    if (this.SellProduct.controls['Quantity'].value <= this.SellProductDetails[0].Quantity) {
      this.SellProductDetails[0].Quantity = this.SellProductDetails[0].Quantity - this.SellProduct.controls['Quantity'].value;
      this._CrudService.UpdateProduct(this.ProductId.id, this.SellProductDetails[0]).subscribe((res: any) => {
        this._CrudService.getProduct();
        this._themeService.openSnackBar('Product Sell Success Fully', 'greenPannel');
      });

      for (let products of this.AllProducts) {
        if (products.Quantity == 0) {
          this._CrudService.DeleteProduct(products.id).subscribe((res: any) => {
            this._themeService.openSnackBar('All Products Sell', 'greenPannel');
            this._CrudService.getProduct();
          });

          this._CrudService.GetProductHistory();
          setTimeout(() => {
            this.AddProductHistory = this._CrudService.ProductAddHistory.filter((data: any) => (data.ProductName == this.SellProductDetails[0].ProductName && data.Category == this.SellProductDetails[0].Category));
            console.error('sellproduct Details  = ', this.SellProductDetails[0]);
            console.error('History Details  = ', this.AddProductHistory[0]);
            this.AddProductHistory[0].status = 2;
            this._CrudService.UpdateProductHistory(this.AddProductHistory[0].id, this.AddProductHistory[0]).subscribe((res: any) => { });
            this._CrudService.GetProductHistory();
          }, 1000);
        }
      }
    }
    else {
      let Message = 'Product Avalible Only ' + this.SellProductDetails[0].Quantity;
      this._themeService.openSnackBar(Message, 'redPannel');
    }
  }
}


