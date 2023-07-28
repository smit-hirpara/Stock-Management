import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private route: Router) { }

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


  /*======================= Login User Data Base =======================*/
  ProductDataBase = 'http://localhost:3000/Products';
  AddProduct(data: any) {
    return this.http.post(this.ProductDataBase, data);
  }

  GetProduct() {
    return this.http.get(this.ProductDataBase);
  }
}