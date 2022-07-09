import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-food-ordered',
  templateUrl: './food-ordered.component.html',
  styleUrls: ['./food-ordered.component.scss']
})
export class FoodOrderedComponent implements OnInit, OnChanges{

@Input() foodOredered: any[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType | any;
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor:['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
    '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
    '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
    borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)',
    'rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)',
    'rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)' ]
 }];

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
   console.log('change', this.foodOredered)
   this.pieChartLabels = this.foodOredered.map(data => {return data.food})
   this.pieChartData = this.foodOredered.map(data => {return data.foodBooked})
   this.pieChartType = 'pie'
   monkeyPatchChartJsTooltip();
   monkeyPatchChartJsLegend();
  }
  ngOnInit(): void {
  }
}
