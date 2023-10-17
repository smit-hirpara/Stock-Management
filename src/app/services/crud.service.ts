import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { productAddHistory, productDetails } from '../pages/history/history.component';

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
  UpdateUser(id: any, value: any) {
    return this.http.put(this.UsersDateBase + '/' + id, value);
  }



  /*======================= Products Data Base =======================*/
  ProductDataBase = 'http://localhost:3000/Products';
  /*----- Add Product -----*/
  AddProduct(data: any) {
    return this.http.post(this.ProductDataBase, data);
  }

  /*----- Get Product -----*/
  GetProduct() {
    return this.http.get(this.ProductDataBase);
  }

  /*===== Get All Products =====*/
  getProduct() {
    this.GetProduct().subscribe((res: any) => {
      this.ProductsDetails = res;
    })
  }

  /*----- Get Product -----*/
  UpdateProduct(id: any, value: any) {
    return this.http.put(this.ProductDataBase + '/' + id, value);
  }

  /*----- Delete Product -----*/
  DeleteProduct(id: any) {
    return this.http.delete(this.ProductDataBase + '/' + id);
  }


  /*======================= Products Add History Data Base =======================*/
  ProductHistoryDataBase = 'http://localhost:3000/ProductsAddHistory';
  /*----- Add Product Hisroty -----*/
  AddProductHistory(data: any) {
    return this.http.post(this.ProductHistoryDataBase, data);
  }

  /*----- Get Product Hisroty -----*/
  getProductHistory() {
    return this.http.get(this.ProductHistoryDataBase);
  }

  ProductAddHistory: productAddHistory[] = new Array<productAddHistory>();
  GetProductHistory() {
    this.getProductHistory().subscribe((res: any) => {
      this.ProductAddHistory = res;
      console.warn('product Add History', this.ProductAddHistory);
    })
  }

  UpdateProductHistory(id: any, value: any) {
    return this.http.put(this.ProductHistoryDataBase + '/' + id, value)
  }

  /*======================= Products Sell History Data Base =======================*/
  ProductSellHistoryDataBase = 'http://localhost:3000/ProductsSellHistory';
  /*----- Add Product Sell Hisroty -----*/
  AddProductSellHistory(data: any) {
    return this.http.post(this.ProductSellHistoryDataBase, data);
  }

  /*----- Get Product Sell Hisroty -----*/
  getProductSellHistory() {
    return this.http.get(this.ProductSellHistoryDataBase);
  }

}