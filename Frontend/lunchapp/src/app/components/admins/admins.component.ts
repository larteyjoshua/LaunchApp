import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { MatTableDataSource } from '@angular/material/table';
import { getAdminsDetails } from 'src/app/selectors/index.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateAdminComponent } from '../create-admin/create-admin.component';
import { FormServicesService } from '../../services/form-services.service';
import { DialogService } from 'src/app/services/dialog.service';
import { deleteAdmin } from '../../actions/admin.actions';


@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit, AfterViewInit {

  public adminsWithDetail: Observable<any>;
  listData: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id',
   'name',
    'email',
    'isActive',
     'role',
      'actions'];
  searchKey: string= '';
  constructor(private store: Store<AppState>,
    public formService: FormServicesService,
    private dialogService: DialogService
    ) {

      this.adminsWithDetail = this.store.pipe(select(getAdminsDetails));

  }
  ngAfterViewInit(): void {
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }
  ngOnInit(): void {

      this.adminsWithDetail.subscribe((data) => {
        if (data){
        console.log('admin',data)
        this.listData = new MatTableDataSource(data);
      }
    });
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  //   this.listData.filterPredicate = (data, filter) => {
  //     return this.displayedColumns.some(ele => {
  //       return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
  //     });
  // }
}


onSearchClear() {
  this.searchKey = "";
  this.applyFilter();
}

applyFilter() {
  this.listData.filter = this.searchKey.trim().toLowerCase();
}

onCreate() {
  this.dialogService.sharedDialog(CreateAdminComponent);
}

onEdit(row:any){
  let updateAdmin:any = {
    "id":row.id,
    "fullName":row.fullName,
    "email": row.email,
    "isActive": row.isActive==true? '1':'2',
    "password":''
   }
   console.log(updateAdmin, '____row')
  this.formService.populateAdminForm(updateAdmin);
  this.dialogService.sharedDialog(CreateAdminComponent);
}

onDelete(id:number){
  console.log('id', id)
  this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
  .afterClosed().subscribe(res =>{
    if(res){
    this.store.dispatch(deleteAdmin({id:id}));
    }
  });
}

}
