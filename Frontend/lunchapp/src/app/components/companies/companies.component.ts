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
  constructor(  private store: Store<AppState>,) {
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

  onCreate() {}
  onEdit(row:any){}
  onDelete($id:number){}
}
