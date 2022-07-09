import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getOrdersWithUserDetails } from 'src/app/selectors/index.selectors';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public ordersDetailList: Observable<any>;
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
     'actions'];
  searchKey: string ='';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private store: Store<AppState>,) {
    this.ordersDetailList = this.store.pipe(select(getOrdersWithUserDetails));
  }
  ngOnInit(): void {
    this.ordersDetailList.subscribe((data) => {
      if (data){
      console.log('OderDetails', data)
      this.listData = new MatTableDataSource(data);
    }
  });
  this.listData.sort = this.sort;
  this.listData.paginator = this.paginator;
  // this.listData.filterPredicate = (data, filter) => {
  //   return this.displayedColumns.some(ele => {
  //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
  //   });
  // }

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {}
  onEdit(row:any){}
  onDelete($id:number){}
}
