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
  UserRole,
  UploadStatus
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
import {
   createFunction,
   deleteFunction,
   updateFunction,
   updateUserRoleFunction,
   deleteUserRoleFunction,
   createBulkFunction
   } from '../utils/app-utils';


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
 foods: ShowFood[];
 orders: ShowOrder[];
 userRoles: UserRole[];

 status: UploadStatus;
 fileUploadError: string;
 progress: number;


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
 userRoles:[],
 status: UploadStatus.Ready,
 fileUploadError: '',
 progress: 0

};
 const _lunchAppReducer = createReducer(
  initialState,

  // =============== Login Reducer =============
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
 )),


  // =============== Admin Reducer =============
 on(AdminPageActions.loadAdmins, state =>
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


 // =============== User Reducer =============
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

on(UserPageActions.createBulkUserSuccess, (state, {data}) =>({
  ...state,
  users: createBulkFunction(state.users, data),
  status: UploadStatus.Completed,
  progress: 100,
})),


 // =============== Company Reducer =============
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
on(CompanyPageActions.deleteCompanySuccess, (state, {data}) =>
({
  ...state,
  companies: deleteFunction(state.companies,data)

})),

on(CompanyPageActions.updateCompanySuccess, (state, {data}) =>
({
  ...state,
  companies: updateFunction(state.companies,data)
})),

on(CompanyPageActions.createCompanySuccess, (state, {data}) =>({
  ...state,
  companies:createFunction(state.companies, data)
})),


 // =============== Rider Reducer =============
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

on(RiderPageActions.deleteRiderSuccess, (state, {data}) =>
({
  ...state,
  riders: deleteFunction(state.riders,data)

})),

on(RiderPageActions.updateRiderSuccess, (state, {data}) =>
({
  ...state,
  riders: updateFunction(state.riders,data)
})),

on(RiderPageActions.createRiderSuccess, (state, {data}) =>({
  ...state,
  riders:createFunction(state.riders, data)
})),


 // =============== Roles Reducer =============
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


 // =============== Feedback Reducer =============
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


 // =============== Account Reducer =============
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


 // =============== Food Reducer =============
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

on(FoodPageActions.deleteFoodSuccess, (state, {data}) =>
({
  ...state,
  foods: deleteFunction(state.foods,data)

})),

on(FoodPageActions.updateFoodSuccess, (state, {data}) =>
({
  ...state,
  foods: updateFunction(state.foods,data)
})),


on(FoodPageActions.createFoodSuccess, (state, {data}) =>({
  ...state,
  foods:createFunction(state.foods, data)
})),


 // =============== Order Reducer =============
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

on(OrderPageActions.deleteOrderSuccess, (state, {data}) =>
({
  ...state,
  orders: deleteFunction(state.orders,data)

})),

on(OrderPageActions.updateOrderSuccess, (state, {data}) =>
({
  ...state,
  orders: updateFunction(state.orders,data)
})),


 // =============== UserRole Reducer =============
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
)),
on(UserRoleActions.deleteUserRoleSuccess, (state, {data}) =>
({
  ...state,
  userRoles: deleteUserRoleFunction(state.userRoles,data)

})),

on(UserRoleActions.updateUserRoleSuccess, (state, {data}) =>
({
  ...state,
  userRoles: updateUserRoleFunction(state.userRoles,data)
})),

on(UserRoleActions.createUserRoleSuccess, (state, {data}) =>({
  ...state,
  userRoles:createFunction(state.userRoles, data)
})),


 // =============== CSV User File Upload Reducer =============
 on(UserPageActions.UploadRequestAction, (state, {file}) =>({
  ...state,
  status: UploadStatus.Requested,
  progress: 0,
   fileUploadError: ''
})),

on(UserPageActions.UploadCancelAction, (state) =>({
  ...state,
  status: UploadStatus.Ready,
  progress: 0,
   fileUploadError: ''
})),

on(UserPageActions.UploadRequestAction, (state) =>({
  ...state,
  status: UploadStatus.Ready,
  progress: 0,
   fileUploadError: ''
})),

on(UserPageActions.UploadFailureAction, (state) =>({
  ...state,
  status: UploadStatus.Failed,
  progress: 0,
   fileUploadError: ''
})),

on(UserPageActions.UploadStartedAction, (state) =>({
  ...state,
  status: UploadStatus.Started,
  progress: 0,
})),

on(UserPageActions.UploadProgressAction, (state, {progress}) =>({
  ...state,
  status: UploadStatus.Ready,
  progress: progress,
})),

on(UserPageActions.UploadCompletedAction, (state,) =>({
  ...state,
  status: UploadStatus.Completed,
  progress: 100,
})),

);


export function lunchAppReducer(state: AppState, action: Action) {
  return _lunchAppReducer(state, action);
}
