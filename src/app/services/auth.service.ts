import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { userDetails } from '../pages/history/history.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) { }
  loginUserDetails: userDetails[] = new Array<userDetails>;
  userAuthorize!: boolean;
  authorizeValue = localStorage.getItem('UserAuthorize');
  authorize: boolean = this.authorizeValue ? JSON.parse(this.authorizeValue) : false;

  GetLoginuserFormdatabase: any;
  GetLoginUserDetails: any;

  /*===== Get Logn User Details From Local Storage =====*/
  GetloginUserfromDatabase() {
    this.GetLoginuserFormdatabase = localStorage.getItem('loginUser');
    this.GetLoginUserDetails = JSON.parse(this.GetLoginuserFormdatabase);
  }

  /*===== Check User Admin or not =====*/
  userAuthorie() {
    for (const user of this.GetLoginUserDetails) {
      this.userAuthorize = user.admin ? user.admin : false;
    }
  }

  /*===== Navidate To Product Commponent =====*/
  navigateProducts() {
    this.route.navigate(['/products']);
  }

  /*===== Navidate To Login Form Commponent =====*/
  navigateLoginForm() {
    this.route.navigate(['/login']);
  }
}
