import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  ProductDetails!: FormGroup;
  constructor(private fb: FormBuilder, private CrudService: CrudService) { }
  ngOnInit(): void {
    this.ProductDetails = this.fb.group({
      Category: ['', Validators.compose([Validators.required])],
      ProductName: ['', Validators.compose([Validators.required])],
      Size: ['', Validators.compose([Validators.required])],
      Price: ['', Validators.compose([Validators.required])],
      Quantity: ['', Validators.compose([Validators.required])],
    })
  }


  ProductInformation: any;
  SaveProduct() {
    this.getCurrentDate();
    this.ProductInformation = { ...this.ProductDetails.value, date: this.currentDate, image: this.images };
    console.warn(this.ProductInformation);
    this.CrudService.AddProduct(this.ProductInformation).subscribe((res: any) => {
      console.warn('product Add uccessfully');
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
