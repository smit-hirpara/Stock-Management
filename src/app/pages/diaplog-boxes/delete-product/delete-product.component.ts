import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { ThemeService } from 'src/app/services/theme.service';
import { productDetails } from '../../history/history.component';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {
  /*========== Services ==========*/
  _themeService = inject(ThemeService);
  _CrudService = inject(CrudService);
  _authService = inject(AuthService);
  _route = inject(ActivatedRoute);

  DeleteQuantity!: number;
  ProductId: any;
  AllProducts: productDetails[] = new Array<productDetails>;

  ngOnInit(): void {
    this.GetProductId();
    this.GetProducts();
  }
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
  DeleteProduct() {
    this.GetProductId();
    this.SellProductDetails = this.AllProducts.filter((data: any) => (data.id == this.ProductId.id));
    if (this.DeleteQuantity <= this.SellProductDetails[0].Quantity) {
      this.SellProductDetails[0].Quantity = this.SellProductDetails[0].Quantity - this.DeleteQuantity;
      this._CrudService.UpdateProduct(this.ProductId.id, this.SellProductDetails[0]).subscribe((res: any) => {
        this._CrudService.getProduct();
        this._themeService.openSnackBar('Product Delete Success Fully', 'greenPannel');
      });

      for (let products of this.AllProducts) {
        if (products.Quantity == 0) {
          this._CrudService.DeleteProduct(products.id).subscribe((res: any) => {
            this._themeService.openSnackBar('All Products Delete', 'greenPannel');
            this._CrudService.getProduct();
          });
        }
      }
    }
    else {
      let Message = 'Product Avalible Only ' + this.SellProductDetails[0].Quantity;
      this._themeService.openSnackBar(Message, 'redPannel');
    }
  }
}
