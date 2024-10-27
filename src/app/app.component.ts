import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js'
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';

const CHART_TITLE = "Top Programming Languages";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseChartDirective, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClient]

})
export class AppComponent {
  title = 'Assignment2-elliotcurrie';
  counter = 0;
  public languages: any;


  dataHeadings: string[] = [];
  dataValues: number[] = [];

  // test

  async ngOnInit() {
    await this.loadJson();
  }

  // chart specific properties
  chartType: ChartType = "bar";
  chartData: ChartData = { datasets: [] };

  // responsive options
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      title: {
        display: true,
        text: CHART_TITLE,
        font: {
          size: 12
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: {
            size: 8
          },
          color: 'black',
          padding: 20,
          boxWidth: 20,
        }
      }
    }

  };

  constructor(private http: HttpClient) {

    // this.loadJson();
    // this.loadJson();


    // implementing test data
    // let testLabels = ['A', 'B'];
    // let testData = [100, 200];
    // let testBgColors = ["#ff3d3366"];
    let testBdColors = ["#ff3d33ff"];

    this.chartData = {

      labels: this.dataHeadings,
      datasets: [{
        label: "percent",
        data: this.dataValues,
        backgroundColor: '',
        borderColor: '',
        borderWidth: 1
      }]

    };
  } // constructor 

  // function that loads data from json file using http request
  loadJson() {
    // in the case of the request not returning anything, wrapped in try-catch block
    this.http.get<any>('assets/data/program-languages.json').subscribe(
      (value) => {
        console.log("json fetch successful");
        this.languages = value;

        // resetting counter
        this.counter = 0;

        for (let item in this.languages) {
          console.log("for iteration: " + (this.counter + 1));
          this.dataHeadings[this.counter] = this.languages[item].language;
          this.dataValues[this.counter] = this.languages[item].percent;

          // console.log("Assigned " + this.counter + 1 + " of headings to: " + this.jsonData[item].language);
          // console.log("Assigned " + this.counter + 1 + " of values to: " + this.jsonData[item].percent);

          this.counter += 1;
        }

        console.log("fetched data", this.languages);

      },
      (err) => {
        console.log("trouble fetching json...");
        console.error(err);
      }
    );

    // iterates over jsonData and splits values into 2 different arrays for ng2-charts to use

  }

} // class


