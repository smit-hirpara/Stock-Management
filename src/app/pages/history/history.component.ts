import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  constructor(public authService: AuthService, public ThemeService: ThemeService, private crudService: CrudService) {
    /*----------- Check User Authorize Or Not -----------*/
    if (!this.authService.authorize) {
      this.authService.navigateLoginForm();
    }

    this.authService.userAuthorie();
  }

  ngOnInit(): void {
    this.getUsers();
    this.GetProduct();
  }
  AllUsers: userDetails[] = new Array<userDetails>;
  productDetails: productDetails[] = new Array<productDetails>;
  filterUser: userDetails[] = new Array<userDetails>;
  userHistory: productDetails[] = new Array<productDetails>;
  columns: string[] = ['date', 'Category', 'product', 'quantity', 'size', 'price'];

  /*===== Get All Users =====*/
  getUsers() {
    this.crudService.GetUsers().subscribe((res: any) => {
      this.AllUsers = res;
    })
  }

  /*===== Get All Products =====*/
  GetProduct() {
    this.crudService.GetProduct().subscribe((res: any) => {
      this.productDetails = res;
    });
  }

  /*===== Get User History Dynamically =====*/
  GetHistory(index: any) {
    this.GetProduct();
    /*----- Filter User -----*/
    this.filterUser = this.AllUsers.filter((data: any) => (data.id == index));

    /*----- Filter User History -----*/
    this.userHistory = this.productDetails.filter((data: any) => (data.user == this.filterUser[0].FirstName));
  }

  UpdateUser(id: any, value: any) {
    console.warn(id, value)
    this.crudService.UpdateUser(id, value).subscribe((res: any) => {
      this.getUsers();
    })
  }
}

export class productDetails {
  Category!: string;
  Price!: string;
  ProductName!: string;
  Quantity!: number;
  Size!: string;
  date: any;
  id!: number;
  image: any;
  user!: string
}

export class userDetails {
  DateOfBirth: any;
  Email: any;
  FirstName!: string;
  LastName!: string;
  MobileNo!: string;
  Password: any;
  RetypePassword: any;
  id!: number;
  admin!: boolean;
  mainAdmin!: boolean;
}