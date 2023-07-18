import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) { }
  loginUserDetails: any;
  userAuthorize: any;
  authorizeValue = localStorage.getItem('UserAuthorize');
  authorize: any = this.authorizeValue ? JSON.parse(this.authorizeValue) : false;

  GetLoginuserFormdatabase: any;
  GetLoginUserDetails: any;
  GetloginUserfromDatabase() {
    this.GetLoginuserFormdatabase = localStorage.getItem('loginUser');
    this.GetLoginUserDetails = JSON.parse(this.GetLoginuserFormdatabase);
  }

  userAuthorie() {
    for (const user of this.GetLoginUserDetails) {
      if (user.admin) { }
      this.userAuthorize = user.admin ? user.admin : false;
    }
  }

  navigateProducts() {
    this.route.navigate(['/products']);
  }

  navigateLoginForm() {
    this.route.navigate(['/login']);
  }
}
