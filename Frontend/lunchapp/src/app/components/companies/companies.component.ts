import { CompanyEntryComponent } from './../company-entry/company-entry.component';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ShowCompany } from 'src/app/models';
import { CompaniesDataSource, CompaniesItem } from './companies-datasource';
import { select, Store } from '@ngrx/store'
import { getCompanies } from 'src/app/selectors/index.selectors';
import { AppState } from 'src/app/reducers';
import { deleteAdmin } from 'src/app/actions/admin.actions';
import { DialogService } from 'src/app/services/dialog.service';
import { FormServicesService } from 'src/app/services/form-services.service';
import { CreateAdminComponent } from '../create-admin/create-admin.component';
import { deleteCompany } from '../../actions/company.actions';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public companyList: Observable<ShowCompany[]>;
  listData: MatTableDataSource<any> = new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
   'name',
    'email',
    'location',
    'isActive',
    'dateAdded',
    'actions'
   ];
  searchKey: string='';
  constructor(
    private store: Store<AppState>,
    private dialogService: DialogService,
    public formService: FormServicesService,
    ) {
    this.companyList = this.store.pipe(select(getCompanies));
  }
  ngOnInit(): void {
    this.companyList.subscribe((data) => {
      if (data){
      console.log(data)
      this.listData = new MatTableDataSource(data);
    }
  });
  this.listData.sort = this.sort;
  this.listData.paginator = this.paginator;
  // this.listData.filterPredicate = (data, filter) => {
  //   return this.displayedColumns.some(ele => {
  //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
  //   });
  // };
}


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.dialogService.sharedDialog(CompanyEntryComponent);
  }

  onEdit(row:any){
    let updateCompany:any = {
      "id":row.id,
      "name":row.name,
      "email": row.email,
      "isActive": row.isActive==true? '1':'2',
      "phoneNumber":row.phoneNumber,
      "location": row.location,
      "dateAdded": row.dateAdded
     }
     console.log(updateCompany, '____row')
    this.formService.populateCompanyForm(updateCompany);
    this.dialogService.sharedDialog(CompanyEntryComponent);
  }

  onDelete(id:number){
    console.log('id', id)
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
      this.store.dispatch(deleteCompany({id:id}));
      }
    });
  }
}
