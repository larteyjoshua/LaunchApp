import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-highest-order-day',
  templateUrl: './highest-order-day.component.html',
  styleUrls: ['./highest-order-day.component.scss']
})
export class HighestOrderDayComponent implements OnInit,OnChanges {

  @Input() highestOrder: any[] = [];
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions ) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'white',
      backgroundColor: 'green',
    },
  ];
  public lineChartLegend = true;
  public lineChartType:ChartType  = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change', this.highestOrder)
    this.lineChartLabels = this.highestOrder.map(data => {return data.date});
    const data =this.highestOrder.map(data => { return data.order});
    this.lineChartData = [
      { data:data, label: 'Highest Order Day' },
    ];

   }

  ngOnInit(): void {
  }

}
