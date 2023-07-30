import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  chart: any;
  chart2: any;
  chart3: any;
  ngOnInit(): void {
    this.chart = document.getElementById('chart');
    this.chart2 = document.getElementById('chart2');
    this.chart3 = document.getElementById('chart3');
    Chart.register(...registerables);
    this.loadChart();
  }
  Createchart: any;
  loadChart() {
    this.Createchart = new Chart(this.chart, {
      type: 'line',
      data: {
        datasets: [
          {
            data: [30,20,50,20,30,10,50],
            label: 'Series 1',
            backgroundColor: '#007bff',
            tension: 0.2,
            borderColor: '#007bff',
          },
          // {
          //   label: "Sales",
          //   data: [2, 3, 5, 3,],
          //   backgroundColor: 'red',
          //   borderColor: 'red',
          //   tension: 0.2
          // },
          // {
          //   label: "Profit",
          //   data: [3, 4, 3, 1],
          //   backgroundColor: 'green',
          //   borderColor: 'green',
          //   tension: 0.2
          // }
        ],
        labels: [
          'Uncompleted',
          'Progress',
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

    this.Createchart = new Chart(this.chart2, {
      type: 'bar',
      data: {
        datasets: [
          {
            data: [30,20,50,20,30,10,50],
            label: 'Series 1',
            backgroundColor: '#007bff',
            // tension: 0.2,
            borderColor: '#007bff',
          },
          // {
          //   label: "Sales",
          //   data: [2, 3, 5, 3,],
          //   backgroundColor: 'red',
          //   borderColor: 'red',
          //   tension: 0.2
          // },
          // {
          //   label: "Profit",
          //   data: [3, 4, 3, 1],
          //   backgroundColor: 'green',
          //   borderColor: 'green',
          //   tension: 0.2
          // }
        ],
        labels: [
          'Uncompleted',
          'Progress',
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

    this.Createchart = new Chart(this.chart3, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [30,20,50,20,30,10,50],
            label: 'Series 1',
            backgroundColor: '#007bff',
            // tension: 0.2,
            borderColor: '#007bff',
          },
          // {
          //   label: "Sales",
          //   data: [2, 3, 5, 3,],
          //   backgroundColor: 'red',
          //   borderColor: 'red',
          //   tension: 0.2
          // },
          // {
          //   label: "Profit",
          //   data: [3, 4, 3, 1],
          //   backgroundColor: 'green',
          //   borderColor: 'green',
          //   tension: 0.2
          // }
        ],
        labels: [
          'Uncompleted',
          'Progress',
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
  }
}
