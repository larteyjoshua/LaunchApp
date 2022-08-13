import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { ShowCost } from '../../models/index';
import { getCostWithdetails } from '../../selectors/index.selectors';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})
export class CostComponent implements OnInit, AfterViewInit{

  public costList: Observable<ShowCost[]>
  listData: MatTableDataSource<any> = new MatTableDataSource()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'companyId',
    'company',
    'totalCost',
    'dateGenerated',
    'generatedBy',
    ];
  searchKey: string= '';

  constructor( private store: Store<AppState>,) {

    this.costList = this.store.pipe(select(getCostWithdetails));
  }


  ngOnInit(): void {
    this.costList.subscribe((data) => {
      if (data){
      console.log(data)
      this.listData = new MatTableDataSource(data);
    }
  });

}

ngAfterViewInit(): void {
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

  onCreate() {}
  onEdit(row:any){}
  onDelete($id:number){}


}
