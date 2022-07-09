import {
  Action,
  createReducer,
   on
} from '@ngrx/store';

import {
  ShowAdmin,
  ShowUser,
  ShowCompany,
  ShowRider,
  ShowRole,
  ShowFeedback,
  ShowAccount,
  ShowFood,
  ShowOrder,
  UserRole
 } from '../models/index';
import * as LoginPageActions from '../actions/login.actions'
import * as AdminPageActions from '../actions/admin.actions'
import * as UserPageActions from '../actions/user.actions'
import * as CompanyPageActions from '../actions/company.actions'
import * as RiderPageActions from '../actions/rider.actions'
import * as RolePageActions from '../actions/role.actions'
import * as FeedbackPageActions from '../actions/feedback.actions'
import * as AccountPageActions from '../actions/account.actions'
import * as FoodPageActions from '../actions/food.actions'
import * as OrderPageActions from '../actions/order.actions'
import * as UserRoleActions from '../actions/user-role.actions'
import { createFunction, deleteFunction, updateFunction } from '../utils/app-utils';


export interface AppState {
 error: string;
 token: string;
 admins: ShowAdmin[];
 admin: ShowAdmin;
 adminId: any;
 users: ShowUser[];
 companies: ShowCompany[];
 riders: ShowRider[];
 roles: ShowRole[];
 feedbacks: ShowFeedback[];
 accounts: ShowAccount[];
 foods: ShowFood[],
 orders: ShowOrder[],
 userRoles: UserRole[]

}

export const initialState: Readonly <AppState> = {
 error: '',
 token: '',
 admins:[],
 adminId: null,
 admin: {id: -1,email: '', fullName: '',},
 users:[],
 companies:[],
 riders:[],
 roles:[],
 feedbacks:[],
 accounts:[],
 foods:[],
 orders:[],
 userRoles:[]

};
 const _lunchAppReducer = createReducer(
  initialState,
  on(LoginPageActions.loadLogins, state =>
    ({
      ...state,
      error: state.error

    })),
    on(LoginPageActions.loadLoginsSuccess,(state, {token}) => ({
      ...state,
        token:token,
    }
   )),

   on(LoginPageActions.loadLoginsFailure,(state, {error}) => ({
    ...state,
      error:error,
  }
 )),on(AdminPageActions.loadAdmins, state =>
  ({
    ...state,
    error: state.error
  })),
on(AdminPageActions.loadAdminsSuccess, (state, {data}) =>(
  {...state,
    admins: data

  }
)),
on(AdminPageActions.deleteAdminSuccess, (state, {data}) =>
({
  ...state,
  admins: deleteFunction(state.admins,data)

})),

on(AdminPageActions.updateAdminSuccess, (state, {data}) =>
({
  ...state,
  admins: updateFunction(state.admins,data)
})),

on(AdminPageActions.createAdminSuccess, (state, {data}) =>({
  ...state,
  admins:createFunction(state.admins, data)
})),

on(AdminPageActions.loadAdminsFailure, (state, {adminError}) =>
({
  ...state,
  error: adminError
})),
on(UserPageActions.loadUsers, state => ({
  ...state,
  error: state.error
})),
on(UserPageActions.loadUsersSuccess, (state, {data}) => (
  {
  ...state,
  users: data
})),
on(UserPageActions.loadUsersFailure, (state, {error}) =>(
  {
    ...state,
    error:error
  }
)),

on(UserPageActions.deleteUserSuccess, (state, {data}) =>
({
  ...state,
  users: deleteFunction(state.users,data)

})),

on(UserPageActions.updateUserSuccess, (state, {data}) =>
({
  ...state,
  users: updateFunction(state.users,data)
})),

on(UserPageActions.createUserSuccess, (state, {data}) =>({
  ...state,
  users:createFunction(state.users, data)
})),

on( CompanyPageActions.loadCompanys, state => (
  {
    ...state,
    error: state.error
  }
)),
on(CompanyPageActions.loadCompanysSuccess, (state, {data}) => (
  {
    ...state,
    companies:data
  }
)),
on(CompanyPageActions.loadCompanysFailure, (state, {error}) => (
  {
    ...state,
    error: error
  }
)),
on(RiderPageActions.loadRiders, state => (
  {
    ...state,
    error: state.error

  }
)),
on(RiderPageActions.loadRidersSuccess, (state, {data}) => (
  {
    ...state,
    riders: data
})),
on(RiderPageActions.loadRidersFailure, (state, {error}) => (
  {
    ...state,
    error: error

  }
)),
on(RolePageActions.loadRoles, state => (
  {
    ...state,
    error: state.error
  }
)),
on(RolePageActions.loadRolesSuccess, (state, {data}) => (
  {
    ...state,
    roles: data
})),

on(RolePageActions.loadRolesFailure, (state, {error}) => (
  {
    ...state,
    error: error

  }
)),
on(FeedbackPageActions.loadFeedbacks, state => ({
  ...state,
  error: state.error
})),
on(FeedbackPageActions.loadFeedbacksSuccess, (state, {data}) => (
  {
  ...state,
  feedbacks: data
})),
on(FeedbackPageActions.loadFeedbacksFailure, (state, {error}) =>(
  {
    ...state,
    error:error
  }
)),
on(AccountPageActions.loadAccounts, state => ({
  ...state,
  error: state.error
})),
on(AccountPageActions.loadAccountsSuccess, (state, {data}) => (
  {
  ...state,
  accounts: data
})),
on(AccountPageActions.loadAccountsFailure, (state, {error}) =>(
  {
    ...state,
    error:error
  }
)),
on(FoodPageActions.loadFoods, state => ({
  ...state,
  error: state.error
})),
on(FoodPageActions.loadFoodsSuccess, (state, {data}) => (
  {
  ...state,
  foods: data
})),
on(FoodPageActions.loadFoodsFailure, (state, {error}) =>(
  {
    ...state,
    error:error
  }
)),
on(OrderPageActions.loadOrders, state => ({
  ...state,
  error: state.error
})),
on(OrderPageActions.loadOrdersSuccess, (state, {data}) => (
  {
  ...state,
  orders: data
})),
on(OrderPageActions.loadOrdersFailure, (state, {error}) =>(
  {
    ...state,
    error:error
  }
)),
on(UserRoleActions.loadUserRoles, state => ({
  ...state,
  error: state.error
})),
on(UserRoleActions.loadUserRolesSuccess, (state, {data}) => (
  {
  ...state,
  userRoles: data
})),
on(UserRoleActions.loadUserRolesFailure, (state, {error}) =>(
  {
    ...state,
    error:error
  }
))

);

export function lunchAppReducer(state: AppState, action: Action) {
  return _lunchAppReducer(state, action);
}

// export const adminReducer = createReducer(
//   initialState,

// );

// export const userReducer = createReducer(
//   initialState,

// );


// export const companyReducer = createReducer(
//   initialState,

// );

// export const riderReducer = createReducer(
//   initialState,

//   );

//   export const roleReducer = createReducer(
//     initialState,

//   );


//   export const feedbackReducer = createReducer(
//     initialState,

//   );

//   export const accountReducer = createReducer(
//     initialState,

//   );

//   export const foodReducer = createReducer(
//     initialState,

//   );

//   export const orderReducer = createReducer(
//     initialState,

//   );


//   export const userRoleReducer = createReducer(
//     initialState,

//   );



