import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(public authService: AuthService, public ThemeService: ThemeService, private dialog: MatDialog) {

    /*----------- Check User Authorize Or Not -----------*/
    if (!this.authService.authorize) {
      this.authService.navigateLoginForm();
    }
  }

  products = [
    {
      images: [
        'assets/product-images/black_hoodi.png',
        'assets/product-images/red_tshirt.png',
        'assets/product-images/pink_tshirt.png'
      ], name: 'Tishart', price: '200', size: 'sm'
    },
    {
      images: [
        'assets/product-images/blue_shirt.png',
        'assets/product-images/pink_tshirt.png',
        'https://image.made-in-china.com/202f0j00oTKbkHVtqQcR/Red-Solid-Color-Casual-Long-Sleeve-Hoodies-for-Men-Hooded-Sweatshirt-Men-s-Top-Pullover-Hoodies.jpg'
      ], name: 'Tishart', price: '150', size: 'sm'
    },
    { images: ['assets/product-images/pink_tshirt.png'], name: 'Tishart', price: '180', size: 'lg' },
    { images: ['assets/product-images/red_tshirt.png'], name: 'Tishart', price: '120', size: 'lg' },
    { images: ['assets/product-images/white_teshirt.png'], name: 'Tishart', price: '500', size: 'sm' },
  ];


  addProduct() {
    this.dialog.open(AddProductComponent);
  }
}
