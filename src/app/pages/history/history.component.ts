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
  }

  ngOnInit(): void {
    this.getUsers();
  }

  columns: string[] = ['date', 'product', 'quantity', 'size', 'price'];

  Users: any;
  getUsers() {
    this.crudService.GetUsers().subscribe((res: any) => {
      this.Users = res;
    })
  }

  /*----- Filter User -----*/
  filterUser: any;
  userHistory: any;
  productDetails: any;
  GetHistory(index: any) {
    this.crudService.GetProduct().subscribe((res: any) => {
      this.productDetails = res;
      console.warn(this.productDetails);
    })
    /*----- Filter User -----*/
    this.filterUser = this.Users.filter((data: any) => (data.id == index));
    console.warn(this.filterUser);

    this.userHistory = this.productDetails.filter((data: any) => (data.FirstName == this.filterUser.FirstName));
    console.warn(this.userHistory);
  }
}