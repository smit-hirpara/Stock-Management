import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(public authService: AuthService) {

    /*----------- Check User Authorize Or Not -----------*/
    if (!this.authService.authorize) {
      this.authService.navigateLoginForm();
    }
  }
}
