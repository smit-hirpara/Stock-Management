import { Component, Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { ProductsComponent } from '../../products/products.component';
import { AuthService } from 'src/app/services/auth.service';
import { productDetails, userDetails } from '../../history/history.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  /*========= Services =========*/
  ProductDetails!: FormGroup;
  _fb = inject(FormBuilder);
  _CrudService = inject(CrudService);
  _authService = inject(AuthService);
  _productCompo = inject(ProductsComponent);
  _themeService = inject(ThemeService);

  ngOnInit(): void {
    this.ProductDetails = this._fb.group({
      Category: ['', Validators.compose([Validators.required])],
      ProductName: ['', Validators.compose([Validators.required])],
      Size: ['', Validators.compose([Validators.required])],
      Price: ['', Validators.compose([Validators.required])],
      Quantity: ['', Validators.compose([Validators.required])],
    });

    this._authService.userAuthorie();
  }


  ProductInformation: productDetails[] = new Array<productDetails>;
  // loginUserDetails: userDetails = new userDetails;
  loginUserDetails: any;
  SaveProduct() {
    this.getCurrentDate();
    this.loginUserDetails = localStorage.getItem('loginUser');
    this._authService.GetloginUserfromDatabase();
    this.loginUserDetails = this._authService.GetLoginUserDetails[0];
    console.warn(this.loginUserDetails);
    this.ProductInformation = { ...this.ProductDetails.value, date: this.currentDate, image: this.images, user: this.loginUserDetails.FirstName };
    console.warn(this.ProductInformation);
    this._CrudService.AddProduct(this.ProductInformation).subscribe((res: any) => {
      this._themeService.openSnackBar('Product Added Success Fully', 'greenPannel');
      this._CrudService.getProduct();
    });
  }

  /* ================== push uploaded file in images array ==================== */
  images: any = [];
  selectfile(event: any) {
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // read file as data url
        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.images.push(event.target.result);
        }
      }
    }
  }

  /* ================== Delete File from images array ==================== */
  DeleteFiles(index: number) {
    this.images.splice(index, 1);
  }

  currentDate: any;
  getCurrentDate() {
    this.currentDate = new Date();
    console.warn(this.currentDate);
  }

}
