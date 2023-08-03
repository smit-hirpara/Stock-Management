import { Component, Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../../services/crud.service';
import { SellProductComponent } from '../sell-product/sell-product.component';
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
  constructor(public authService: AuthService, public ThemeService: ThemeService, private dialog: MatDialog, public crudService: CrudService) {
    /*----------- Check User Authorize Or Not -----------*/
    if (!this.authService.authorize) {
      this.authService.navigateLoginForm();
    }
  }
  ngOnInit(): void {
    this.crudService.getProduct();

    this.authService.userAuthorie();
  }

  /*===== Add New Product =====*/
  addProduct() {
    this.dialog.open(AddProductComponent);
  }

  SellProduct() {
    this.dialog.open(SellProductComponent);
  }

}
