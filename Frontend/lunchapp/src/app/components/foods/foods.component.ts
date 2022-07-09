import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShowFood } from 'src/app/models';
import { getFoodWithDetails } from 'src/app/selectors/index.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {

  public foodList: Observable<ShowFood[]>;
  listFoods:any[] =[];
  searchKey: string ='';

  /** Based on the screen size, switch from standard to one column per row */
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

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,) {
    this.foodList = this.store.pipe(select(getFoodWithDetails));
  }
  ngOnInit(): void {
    this.foodList.subscribe(data => {
      console.log('food', data)
      this.listFoods = data;
    })
  }

  onSearchClear() {
    this.searchKey = "";
  }
  applyFilter() {}
  onCreate() {}
}
