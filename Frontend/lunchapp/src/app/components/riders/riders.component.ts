import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { DialogService } from 'src/app/services/dialog.service';
import { FormServicesService } from 'src/app/services/form-services.service';
import {getRidersWithDetails} from '../../selectors/index.selectors'
import { RiderEntryComponent } from '../rider-entry/rider-entry.component';
import { deleteRider } from '../../actions/rider.actions';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss']
})
export class RidersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public ridersList: Observable<any>
  listData: MatTableDataSource<any> = new MatTableDataSource()
  displayedColumns = ['id',
  'name',
   'email',
   'motorNumber',
    'tellNumber',
    'dateAdded',
    'addedBy',
     'actions'];
  searchKey: string ='';

  constructor(
    private store: Store<AppState>,
    public formService: FormServicesService,
    private dialogService: DialogService
  ) {
    this.ridersList = this.store.pipe(select(getRidersWithDetails));
  }
  ngOnInit(): void {
    this.ridersList.subscribe((data) => {
      if (data){
      console.log('riders',data)
      this.listData = new MatTableDataSource(data);
    }
  });
  this.listData.sort = this.sort;
  this.listData.paginator = this.paginator;
  }


onSearchClear() {
  this.searchKey = "";
  this.applyFilter();
}

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
}

onCreate() {
  this.dialogService.sharedDialog(RiderEntryComponent);
}
onEdit(row:any){
  console.log('.............', row)
  // let updateUser:any = {
  //   "id":row.id,
  //   "fullName":row.fullName,
  //   "email": row.email,
  //   "isActive": row.isActive==true? '1':'2',
  //   "password":'',
  //   "companyId": castId
  //  }
  row.addedBy = 0
   console.log(row, '____row')
  this.formService.populateRiderForm(row);
  this.dialogService.sharedDialog(RiderEntryComponent);
}

onDelete(id:number){
  console.log('id', id)
  this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
  .afterClosed().subscribe(res =>{
    if(res){
    this.store.dispatch(deleteRider({id:id}));
    }
  });
}
}
