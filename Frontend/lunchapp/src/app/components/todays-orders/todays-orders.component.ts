import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getOrdersWithUserDetails } from 'src/app/selectors/index.selectors';

@Component({
  selector: 'app-todays-orders',
  templateUrl: './todays-orders.component.html',
  styleUrls: ['./todays-orders.component.scss']
})
export class TodaysOrdersComponent implements OnInit, OnChanges {

  @Input() ordersDetailList: any[] = [];

  listData: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns = [
    'id',
  'orderDate',
   'foodName',
   'cost',
    'totalNumber',
    'destination',
    'orderby',
    'companyName',
    'trackingStage',
    'riderName',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
      console.log('OderDetails', this.ordersDetailList)
      this.listData = new MatTableDataSource(this.ordersDetailList);
  this.listData.sort = this.sort;
  this.listData.paginator = this.paginator;
  }
  ngOnInit(): void {


  }


}
