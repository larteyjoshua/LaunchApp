// import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTable, MatTableDataSource } from '@angular/material/table';
// import { Observable } from 'rxjs';
// import { Store,select } from '@ngrx/store';
// import { AppState } from 'src/app/reducers';


// @Component({
//   selector: 'app-accounts',
//   templateUrl: './accounts.component.html',
//   styleUrls: ['./accounts.component.scss']
// })
// export class AccountsComponent implements OnInit {

//   public accountList: Observable<ShowAccount[]>
//   listData: MatTableDataSource<any> = new MatTableDataSource()
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;


//   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
//   displayedColumns = [
//     'companyId',
//   'totalCost',
//   'amountPaid',
//    'balance',
//    'dateModified' ];
//   searchKey: string= '';

//   constructor( private store: Store<AppState>,) {

//     this.accountList = this.store.pipe(select(getAccounts));
//   }
// //   ngOnInit(): void {
// //     this.accountList.subscribe((data) => {
// //       if (data){
// //       console.log(data)
// //       this.listData = new MatTableDataSource(data);
// //     }
// //   });
// //   this.listData.sort = this.sort;
// //   this.listData.paginator = this.paginator;
// //   // this.listData.filterPredicate = (data, filter) => {
// //   //   return this.displayedColumns.some(ele => {
// //   //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
// //   //   });
// //   // }
// // }



// //   onSearchClear() {
// //     this.searchKey = "";
// //     this.applyFilter();
// //   }

// //   applyFilter() {
// //     this.listData.filter = this.searchKey.trim().toLowerCase();
// //   }

// //   onCreate() {}
// //   onEdit(row:any){}
// //   onDelete($id:number){}
//   }
