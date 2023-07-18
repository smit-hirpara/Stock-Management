import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient, private route: Router) { }

  /*----- Login User Data Base -----*/
  DatabaseURL = 'http://localhost:3000/Users';

  /*----- Login user -----*/
  AddUser(data: any) {
    return this.http.post(this.DatabaseURL, data);
  }

  /*----- Get Login Users -----*/
  GetUsers() {
    return this.http.get(this.DatabaseURL);
  }

}
