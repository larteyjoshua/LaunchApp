import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import {getRidersWithDetails} from '../../selectors/index.selectors'

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
    'addedby',
     'actions'];
  searchKey: string ='';

  constructor(private store: Store<AppState>,) {
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

onCreate() {}
onEdit(row:any){}
onDelete($id:number){}
}
