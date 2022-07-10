import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { find } from 'lodash';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { getOrdersWithUserDetails, getRiders } from 'src/app/selectors/index.selectors';
import { DialogService } from 'src/app/services/dialog.service';
import { FormServicesService } from 'src/app/services/form-services.service';
import { findItemId } from '../../utils/app-utils';
import { UserRoleEntryComponent } from '../user-role-entry/user-role-entry.component';
import { OrderEntryComponent } from '../order-entry/order-entry.component';
import { deleteOrder, loadOrders } from '../../actions/order.actions';
import { getOrders } from '../../selectors/index.selectors';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public ordersDetailList: Observable<any>;
  public ordersList: Observable<any>;
  public listOrders:any[]=[];

  public ridersList: Observable<any>
  public listRiders:any[]=[];

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


  constructor(
    private store: Store<AppState>,
    private dialogService: DialogService,
    public formService: FormServicesService,
    ) {
    this.ordersDetailList = this.store.pipe(select(getOrdersWithUserDetails));
    this.ordersList = this.store.pipe(select(getOrders));
    this.ridersList = this.store.pipe(select(getRiders));
  }
  ngOnInit(): void {
    this.store.dispatch(loadOrders());
    this.ordersDetailList.subscribe((data) => {
      if (data){
      console.log('OderDetails', data)
      this.listData = new MatTableDataSource(data);
    }
  });

  this.ordersList.subscribe((data) => {
    if (data){
    console.log('Oder', data)
    this.listOrders = data;
  }
});
  this.listData.sort = this.sort;
  this.listData.paginator = this.paginator;

  this.ridersList.subscribe((data) => {
    if (data){
    console.log('riders',data)
    this.listRiders = data;
  }
});

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onEdit(row:any){
    console.log('....', row)
    let findOrder = findItemId(this.listOrders, row.id)
    findOrder = {...findOrder}
    findOrder.trackingStage= row.trackingStage
    console.log('___order',findOrder)
    this.formService.populateOrderForm(findOrder);
    this.dialogService.sharedDialog(OrderEntryComponent);
  }
  onDelete(id:number){
    console.log('id', id)
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
      this.store.dispatch(deleteOrder({id:id}));
      }
    });
  }
}
