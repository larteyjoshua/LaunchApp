import { AfterViewInit, Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ShowRole, UserRoleActions } from '../../models/index';
import { getRoles } from 'src/app/selectors/index.selectors';
import {Store,select}  from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { DialogService } from 'src/app/services/dialog.service';
import { FormServicesService } from 'src/app/services/form-services.service';
import { UserRoleEntryComponent } from '../user-role-entry/user-role-entry.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, AfterViewInit {
  listData: MatTableDataSource<any> = new MatTableDataSource()
  public roleList: Observable<ShowRole[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','description', 'dateAdded', 'actions' ];
  searchKey: string ='';

  constructor(
    private store: Store<AppState>,
    public formService: FormServicesService,
    private dialogService: DialogService
    )
     {
    this.roleList = this.store.pipe(select(getRoles));
  }
  ngAfterViewInit(): void {
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.roleList.subscribe((data) => {
      if (data){
      console.log(data)
      this.listData = new MatTableDataSource(data);
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

  onUserRoleCreate() {
    this.dialogService.UserRoleDialog(UserRoleEntryComponent, UserRoleActions.create);
  }

  onUserRoleDelete(){
    this.dialogService.UserRoleDialog(UserRoleEntryComponent, UserRoleActions.delete);
  }

  onUserRoleUpdate(){
    this.dialogService.UserRoleDialog(UserRoleEntryComponent,  UserRoleActions.update);
  }

  onEdit(row:any){
   // this.dialogService.sharedDialog(UserRoleEntryComponent);
  }

  onDelete(id:number){
  //  this.dialogService.sharedDialog(UserRoleEntryComponent);
  }
}
