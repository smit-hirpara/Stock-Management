import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { productDetails } from '../history/history.component';
import { CrudService } from '../../services/crud.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  constructor(private crudService: CrudService, public authService: AuthService) { }
  chart: any;
  chart2: any;
  chart3: any;
  ProductData: any;
  // ProductData: string[] = [];


  ngOnInit(): void {
    // this.crudService.getProduct();
    this.getProductDetails();

    // this.chart = document.getElementById('chart');
    this.chart2 = document.getElementById('chart2');
    // this.chart3 = document.getElementById('chart3');
    Chart.register(...registerables);
    this.loadChart();
    // this.GetQuantity();

    /*----------- Check User Authorize Or Not -----------*/
    if (!this.authService.authorize) {
      this.authService.navigateLoginForm();
    }

  }
  Createchart: any;
  loadChart() {
    // this.Createchart = new Chart(this.chart, {
    //   type: 'line',
    //   data: {
    //     datasets: [
    //       {
    //         data: [30, 20, 50, 20, 30, 10, 50],
    //         label: 'Series 1',
    //         backgroundColor: '#007bff',
    //         tension: 0.2,
    //         borderColor: '#007bff',
    //       },
    //     ],
    //     labels: [
    //       'Uncompleted',
    //       'Progress',
    //       'Reviewed',
    //       'Completed',
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     aspectRatio: 1,
    //     scales: {
    //       y: {
    //         beginAtZero: false,
    //       }
    //     }
    //   }
    // })

    this.Createchart = new Chart(this.chart2, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: [30, 20, 50, 20, 30, 10, 50],
            label: 'Series 1',
            backgroundColor: '#007bff',
            borderColor: '#007bff',
          },
        ],
        labels: [
          'Uncompleted',
          'Progress',
          'Reviewed',
          'Completed',
          'Reviewed',
          'Completed',
          'Reviewed',
          'Completed',
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
          y: {
            beginAtZero: false,
          }
        }
      }
    })

    // this.Createchart = new Chart(this.chart3, {
    //   type: 'pie',
    //   data: {
    //     datasets: [
    //       {
    //         data: [30, 20, 50, 20, 30, 10, 50],
    //         label: 'Series 1',
    //         backgroundColor: '#007bff',
    //         borderColor: '#007bff',
    //       },
    //     ],
    //     labels: [
    //       'Uncompleted',
    //       'Progress',
    //       'Reviewed',
    //       'Completed',
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     aspectRatio: 1,
    //     scales: {
    //       y: {
    //         beginAtZero: false,
    //       }
    //     }
    //   }
    // })
  }



  getProductDetails() {
    this.crudService.GetProduct().subscribe((res: any) => {
      this.ProductData = res;
    })
    // console.warn(this.crudService.ProductsDetails);
    console.warn(this.ProductData);
  }

  productsQuantityes: any;
  GetQuantity() {
    // for (const Product of this.crudService.ProductsDetails) {
    //   this.productsQuantityes = Product;
    // }
  }
}
