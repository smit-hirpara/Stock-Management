import { productDetails } from './../history/history.component';
import { Component, inject } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CrudService } from '../../services/crud.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  /*========= Services =========*/
  _crudService = inject(CrudService);
  _authService = inject(AuthService);


  barChart: any;
  ProductDetails: productDetails[] = new Array<productDetails>;


  ngOnInit(): void {
    this.getProductDetails();
    this.barChart = document.getElementById('barChart');


    setTimeout(() => {
      this.GetQuantity();
      Chart.register(...registerables);
      this.loadChart();
    }, 1000);

    /*----------- Check User Authorize Or Not -----------*/
    if (!this._authService.authorize) {
      this._authService.navigateLoginForm();
    }

  }


  getProductDetails() {
    this._crudService.GetProduct().subscribe((res: any) => {
      this.ProductDetails = res;
    });
  }


  productsQuantityes: any = [];
  productName: any = [];
  GetQuantity() {
    for (let a = 0; a < this.ProductDetails.length; a++) {
      this.productsQuantityes.push(this.ProductDetails[a].Quantity);
      this.productName.push(this.ProductDetails[a].ProductName);
    }
  }

  Createchart: any;
  loadChart() {
    this.Createchart = new Chart(this.barChart, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: this.productsQuantityes,
            label: 'Series 1',
            backgroundColor: '#1d86e9',
            borderColor: '#1d86e9 ',
          },
        ],
        labels: this.productName
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
      }
    })
  }
}
