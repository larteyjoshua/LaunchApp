import { getAdmins, getAdminsDetails } from './../../selectors/index.selectors';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs';

import { AppState } from 'src/app/reducers';
import { ApiServicesService } from '../../services/apiServices.service';
import {
  getUsersDetails,
  getRoles,
  getFoods,
  getRiders,
  getFeedbacks } from '../../selectors/index.selectors';
import { loadRiders } from '../../actions/rider.actions';
import { loadRoles } from '../../actions/role.actions';
import { loadFoods } from '../../actions/food.actions';
import { loadOrders } from '../../actions/order.actions';
import { loadAccounts } from './../../actions/account.actions';
import { loadFeedbacks } from './../../actions/feedback.actions';
import { loadAdmins } from './../../actions/admin.actions';
import { loadUsers } from '../../actions/user.actions';
import { loadCompanys } from '../../actions/company.actions';
import { ShowOrder, ShowCompany, ShowAccount } from '../../models/index';
import { getOrders, getCompanies, getAccounts } from '../../selectors/index.selectors';
import { loadUserRoles } from '../../actions/user-role.actions';

import {
  ShowRider,
  ShowRole,
  ShowAdmin,
  ShowFood,
  ShowFeedback } from '../../models/index';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public userList: Observable<any>;
  public roleList: Observable<ShowRole[]>;
  public foodList: Observable<ShowFood[]>;
  public riderList: Observable<ShowRider[]>;
  public feedbackList: Observable<ShowFeedback[]>;
  public orderList: Observable<ShowOrder[]>
  public accountList: Observable<ShowAccount[]>
  public adminsWithDetail: Observable<any>

  constructor(
    private store: Store<AppState>,
    ) {
      this.userList = this.store.pipe(select(getUsersDetails));
      this.roleList = this.store.pipe(select(getRoles));
      this.foodList = this.store.pipe(select(getFoods));
      this.riderList = this.store.pipe(select(getRiders));
      this.feedbackList = this.store.pipe(select(getFeedbacks));
      this.orderList = this.store.pipe(select(getOrders));
      this.accountList = this.store.pipe(select(getAccounts));
      this.adminsWithDetail = this.store.pipe(select(getAdminsDetails));


    }

  ngOnInit(): void {

    this.store.dispatch(loadAdmins());
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadCompanys());
    this.store.dispatch(loadRiders());
    this.store.dispatch(loadRoles());
    this.store.dispatch(loadFeedbacks());
    this.store.dispatch(loadAccounts());
    this.store.dispatch(loadFoods());
    this.store.dispatch(loadOrders());
    this.store.dispatch(loadUserRoles())

    this.userList.subscribe(data => console.log(data));

    this.roleList.subscribe((data) => {
      if (data){
      console.log(data)
    }
  });

  this.adminsWithDetail.subscribe((data) => {
    if (data){
    console.log('details', data)
  }
})

    }




}
