import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs/internal/Observable';
import {getHighestOrderPerday , getFoodOrderList, getTodaysOrder, getDashashboardSummaryData  } from '../../selectors/index.selectors';
import { loadOrders } from 'src/app/actions/order.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public groupFoodList: Observable<any[]>;
  foodOredered: any[] =[];

  public dayWithHighestOrder: Observable<any[]>;
  highestOrder: any[] =[];

  public todaysOrderList: Observable<any[]>;
  ordersDetailList:any[] =[];

  public summaryDetails: Observable<any[]>;
  summaryDetailList:any[] =[];

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout  = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>, ) {
      this.groupFoodList = this.store.pipe(select(getFoodOrderList));
      this.dayWithHighestOrder = this.store.pipe(select(getHighestOrderPerday));
      this.todaysOrderList = this.store.pipe(select(getTodaysOrder));
      this.summaryDetails = this.store.pipe(select(getDashashboardSummaryData));


    }
  ngOnInit(): void {
    this.store.dispatch(loadOrders());
  this.groupFoodList.subscribe(data => {
    // console.log('data receive', data)
    this.foodOredered = data;
  });

  this.dayWithHighestOrder.subscribe(data => {
    console.log('date receive', data)
    this.highestOrder = data;
  });

  this.todaysOrderList.subscribe((data) => {
    console.log('new orders', data)
    this.ordersDetailList =data
  });

  this.summaryDetails.subscribe((data) => {
    console.log('smmmmaryyy', data)
    this.summaryDetailList =data
  });
  }

}
