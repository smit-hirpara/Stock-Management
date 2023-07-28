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
  dataSource = ELEMENT_DATA;

  Users: any;
  getUsers() {
    this.crudService.GetUsers().subscribe((res: any) => {
      this.Users = res;
    })
  }
}

export interface PeriodicElement {
  date: string;
  product: string;
  quantity: number;
  size: string;
  price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { date: '10 Jan, 2021', product: 'Hydrogen', quantity: 10, size: 'sm', price: 100 },
  { date: '13 Fab, 2022', product: 'Helium', quantity: 42, size: 'lg', price: 140 },
  { date: '11 Mar, 2021', product: 'Lithium', quantity: 20, size: 'xs', price: 120 },
  { date: '16 Apr, 2020', product: 'Beryllium', quantity: 44, size: 'xl', price: 110 },
  { date: '20 May, 2019', product: 'Boron', quantity: 34, size: 'md', price: 150 },
  { date: '23 Jun, 2020', product: 'Carbon', quantity: 23, size: 'sm', price: 400 },
  { date: '15 Jul, 2023', product: 'Nitrogen', quantity: 12, size: 'xxl', price: 300 },
  { date: '5 Oct, 2018', product: 'Oxygen', quantity: 16, size: 'md', price: 150 },
  { date: '30 Nov, 2019', product: 'Fluorine', quantity: 46, size: 'lg', price: 190 },
  { date: '30 Dec, 2020', product: 'Neon', quantity: 20, size: 'sm', price: 130 },
];