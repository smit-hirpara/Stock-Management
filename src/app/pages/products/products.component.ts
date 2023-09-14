import { Component, Injectable, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { AddProductComponent } from '../diaplog-boxes/add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../../services/crud.service';
import { SellProductComponent } from '../diaplog-boxes/sell-product/sell-product.component';
import { Router } from '@angular/router';
import { DeleteProductComponent } from '../diaplog-boxes/delete-product/delete-product.component';
// import { productDetails } from '../history/history.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class ProductsComponent {
  /*========= Services =========*/
  _authService = inject(AuthService);
  _ThemeService = inject(ThemeService);
  _dialog = inject(MatDialog);
  _crudService = inject(CrudService);
  _router = inject(Router);

  ngOnInit(): void {
    this._crudService.getProduct();

    this._authService.userAuthorie();

    /*----------- Check User Authorize Or Not -----------*/
    if (!this._authService.authorize) {
      this._authService.navigateLoginForm();
    }
  }

  /*===== Add New Product =====*/
  addProduct() {
    this._dialog.open(AddProductComponent);
  }

  SellProduct(id: any) {
    this._dialog.open(SellProductComponent);
    this._router.navigate(['/products'], { queryParams: { id: id } });
  }

  DeleteProduct(id: any) {
    this._dialog.open(DeleteProductComponent);
    this._router.navigate(['/products'], { queryParams: { id: id } });
  }
}
