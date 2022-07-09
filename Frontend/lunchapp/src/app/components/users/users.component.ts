import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteAdmin } from 'src/app/actions/admin.actions';
import { AppState } from 'src/app/reducers';
import { getUsersDetails, getCompanies } from 'src/app/selectors/index.selectors';
import { DialogService } from 'src/app/services/dialog.service';
import { FormServicesService } from 'src/app/services/form-services.service';
import { UserEntryComponent } from '../user-entry/user-entry.component';
import { deleteUser } from '../../actions/user.actions';
import { findItemId } from 'src/app/utils/app-utils';
import { ShowCompany } from 'src/app/models';
import { ShowUser } from '../../models/index';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = [
    'id',
  'fullName',
  'email',
  'isActive',
  'companyName',
   'dateCreated',
   'actions'
  ];
  searchKey: string= '';
  public userList: Observable<any>;
  listData: MatTableDataSource<any> = new MatTableDataSource();

  public companyList: Observable<ShowCompany[]>;
  public listCompany:any[] =[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(
    private store: Store<AppState>,
    public formService: FormServicesService,
    private dialogService: DialogService
    ) {
    this.userList = this.store.pipe(select(getUsersDetails));
    this.companyList = this.store.pipe(select(getCompanies));
  }
  ngOnInit(): void {
    this.userList.subscribe((data) => {
      if (data){
      console.log('users',data)
      this.listData = new MatTableDataSource(data);

      this.companyList.subscribe((data) => {
        if (data){
          this.listCompany = data;
        console.log(data)
        }
        });
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
    this.dialogService.sharedDialog(UserEntryComponent);
  }

  onEdit(row:any){
    const findId = findItemId(this.listCompany,row.companyName).id
    const castId =Number(findId)
    console.log('.............', row)
    let updateUser:any = {
      "id":row.id,
      "fullName":row.fullName,
      "email": row.email,
      "isActive": row.isActive==true? '1':'2',
      "password":'',
      "companyId": castId
     }
     console.log(updateUser, '____row')
    this.formService.populateUserForm(updateUser);
    this.dialogService.sharedDialog(UserEntryComponent);
  }

  onDelete(id:number){
    console.log('id', id)
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
      this.store.dispatch(deleteUser({id:id}));
      }
    });
  }
}
