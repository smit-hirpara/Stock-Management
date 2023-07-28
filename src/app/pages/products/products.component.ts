import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(public authService: AuthService, public ThemeService: ThemeService) {

    /*----------- Check User Authorize Or Not -----------*/
    if (!this.authService.authorize) {
      this.authService.navigateLoginForm();
    }
  }

  products = [
    {img:'assets/product-images/black_hoodi.png',name:'Tishart', price:'200', size:'sm'},
    {img:'assets/product-images/blue_shirt.png',name:'Tishart', price:'150', size:'sm'},
    {img:'assets/product-images/pink_tshirt.png',name:'Tishart', price:'180', size:'lg'},
    {img:'assets/product-images/red_tshirt.png',name:'Tishart', price:'120', size:'lg'},
    {img:'assets/product-images/white_teshirt.png',name:'Tishart', price:'500', size:'sm'},
  ]
}
