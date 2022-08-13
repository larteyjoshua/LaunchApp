import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { loadRiders } from '../../actions/rider.actions';
import { loadRoles } from '../../actions/role.actions';
import { loadFoods } from '../../actions/food.actions';
import { loadOrders } from '../../actions/order.actions';
import { loadFeedbacks } from './../../actions/feedback.actions';
import { loadAdmins } from './../../actions/admin.actions';
import { loadUsers } from '../../actions/user.actions';
import { loadCompanys } from '../../actions/company.actions';
import { loadUserRoles } from '../../actions/user-role.actions';
import { loadCosts } from '../../actions/account.actions';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {





  constructor(
    private store: Store<AppState>,
    ) {


    }

  ngOnInit(): void {

    this.store.dispatch(loadAdmins());
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadCompanys());
    this.store.dispatch(loadRiders());
    this.store.dispatch(loadRoles());
    this.store.dispatch(loadFeedbacks());
    this.store.dispatch(loadCosts());
    this.store.dispatch(loadFoods());
    this.store.dispatch(loadOrders());
    this.store.dispatch(loadUserRoles());
    }

}
