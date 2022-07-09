import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { feedbackWithdetails } from 'src/app/selectors/index.selectors';


@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {


  public feedbackDetailList: Observable<any>;
  listData: any[] =[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  searchKey: string = '';

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },

        };
      }

     return {
        columns: 4,
        miniCard: { cols: 2, rows: 1 },
      };
    })
  );

constructor(
  private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,) {
    this.feedbackDetailList = this.store.pipe(select(feedbackWithdetails));
  }

  ngOnInit(): void {
    this.feedbackDetailList.subscribe((data) => {
      if (data){
      console.log('feedback Details', data)
      this.listData = data;
    }
  });


  // this.listData.filterPredicate = (data, filter) => {
  //   return this.displayedColumns.some(ele => {
  //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
  //   });
  // }

  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.find((key) =>{ key == this.searchKey.trim().toLowerCase()}) ;
  }

  onCreate() {}
  onEdit(row:any){}
  onDelete($id:number){}
}
