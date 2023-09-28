import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { CrudService } from 'src/app/services/crud.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  /*========= Services =========*/
  _authService = inject(AuthService);
  _ThemeService = inject(ThemeService);
  _crudService = inject(CrudService);

  ngOnInit(): void {
    this.getUsers();
    this._crudService.GetProductHistory();
    // this.GetProduct();

    /*----------- Check User Authorize Or Not -----------*/
    if (!this._authService.authorize) {
      this._authService.navigateLoginForm();
    }

    this._authService.userAuthorie();
  }
  AllUsers: userDetails[] = new Array<userDetails>;
  productDetails: productDetails[] = new Array<productDetails>;
  filterUser: userDetails[] = new Array<userDetails>;
  userHistory: productAddHistory[] = new Array<productAddHistory>;
  ReportData: any;
  columns: string[] = ['status', 'date', 'Category', 'product', 'quantity', 'size', 'price'];

  /*===== Get All Users =====*/
  getUsers() {
    this._crudService.GetUsers().subscribe((res: any) => {
      this.AllUsers = res;
    })
  }

  /*===== Get All Products =====*/
  // GetProduct() {
  //   this._crudService.GetProduct().subscribe((res: any) => {
  //     this.productDetails = res;
  //   });
  // }

  /*===== Get User History Dynamically =====*/
  GetHistory(index: any) {
    // this.GetProduct();
    /*----- Filter User -----*/
    this.filterUser = this.AllUsers.filter((data: any) => (data.id == index));

    /*----- Filter User History -----*/
    this.userHistory = this._crudService.ProductAddHistory.filter((data: any) => (data.user == this.filterUser[0].FirstName));

    this.ReportData = this.userHistory;
    for (let a = 0; a < this.ReportData.length; a++) {
      delete this.ReportData[a].id;
      delete this.ReportData[a].image;
    }
  }

  UpdateUser(id: any, value: any) {
    console.warn(id, value)
    this._crudService.UpdateUser(id, value).subscribe((res: any) => {
      this.getUsers();
    })
  }
  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: this.filterUser[0].FirstName + ' History Report',
      useTextFile: false,
      useBom: true,
      headers: ['Category', 'ProductName', 'Size', 'Price', 'Quantity', 'Date', 'User']
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.ReportData);
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
export class productAddHistory {
  Category!: string;
  Price!: string;
  ProductName!: string;
  Quantity!: number;
  Size!: string;
  date: any;
  id!: number;
  user!: string;
  status!: number;
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