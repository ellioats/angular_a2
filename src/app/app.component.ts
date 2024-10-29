import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js'
import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';

const CHART_TITLE = "Top Programming Languages";
const ABOUT_ME_SECTION = "Assignment 2, JSON Data Visualization with ng2-charts - Elliot Currie - Sheridan College";

const CALLER_1 = "btn1";
const CALLER_2 = "btn2";
const CALLER_3 = "btn3";

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
  chartSwitch: number = 0;
  showAboutMe : boolean = false;
  aboutMeText : string = ABOUT_ME_SECTION;
  // false -> bar graph
  // true -> pie graph

  cal1 = CALLER_1;
  cal2 = CALLER_2;
  cal3 = CALLER_3;

  dataHeadings: string[] = [];
  dataValues: number[] = [];

  // test

  async ngOnInit() {
    await this.loadJson();
  }

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

  changeChartSwitch(caller : string) : void {
    switch(caller) {
      case CALLER_1: // bar
        this.chartSwitch = 0;
        break;
      case CALLER_2: // pie
        this.chartSwitch = 1;
        break;
      case CALLER_3: // radar 
        this.chartSwitch = 2;
        break;
    }
    
    this.changeChartState();
  
  }

  changeChartState(): void {
    // change chart switch boolean 
    if (this.chartSwitch == 0) { // bar 
      this.chartType = "bar";
    } else if (this.chartSwitch == 1) { // pie
      this.chartType = "pie";
    } else if (this.chartSwitch == 2) { // radar
      this.chartType = "radar";
    }

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

    // responsive options
    this.chartOptions = {
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
  }

  // reverses about me value
  aboutMe() : void {
    this.showAboutMe = (this.showAboutMe) ? false : true;
  }


  constructor(private http: HttpClient) {

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


