import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { productDetails } from '../pages/history/history.component';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private route: Router) { }
  ProductsDetails: productDetails[] = new Array<productDetails>();


  /*======================= Login User Data Base =======================*/
  UsersDateBase = 'http://localhost:3000/Users';

  /*----- Login user -----*/
  AddUser(data: any) {
    return this.http.post(this.UsersDateBase, data);
  }

  /*----- Get Login Users -----*/
  GetUsers() {
    return this.http.get(this.UsersDateBase);
  }

  /*----- Update Users -----*/
  UpdateUser(id:any, value:any) {
    return this.http.put(this.UsersDateBase + '/' + id, value);
  }



  /*======================= Login User Data Base =======================*/
  ProductDataBase = 'http://localhost:3000/Products';
  AddProduct(data: any) {
    return this.http.post(this.ProductDataBase, data);
  }

  GetProduct() {
    return this.http.get(this.ProductDataBase);
  }

  /*===== Get All Products =====*/
  getProduct() {
    this.GetProduct().subscribe((res: any) => {
      this.ProductsDetails = res;
    })
  }
}