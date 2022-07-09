import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { ApiServicesService } from '../services/apiServices.service';
import { Router } from '@angular/router';
import { concatMap, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as LoginPageActions from '../actions/login.actions'
import * as AdminPageActions from '../actions/admin.actions'
import * as UserPagesActions from '../actions/user.actions'
import * as CompanyPageActions from '../actions/company.actions'
import * as RiderPageActions from '../actions/rider.actions'
import * as RolePageActions from '../actions/role.actions'
import * as FeedbackPageActions from '../actions/feedback.actions'
import * as AccountPageActions from '../actions/account.actions'
import * as FoodPageActions from '../actions/food.actions'
import * as OrderPageActions from '../actions/order.actions'
import * as UserRolePageActions from '../actions/user-role.actions'
import * as CoreActions from '../actions/app.actions'


@Injectable()
export class AppEffects {
// ==============Login Effects================
  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LoginPageActions.loadLogins),
    exhaustMap((action) =>
      this.apiService.login(action.data).pipe(
        map(user => LoginPageActions.loadLoginsSuccess({token:user})),
        catchError(error => of(LoginPageActions.loadLoginsFailure({error: error})))
      ))
  ));


  loginSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LoginPageActions.loadLoginsSuccess),
    tap((user) => {
    const accessToken =user.token.access_token;
    console.log(accessToken, 'tk')
    localStorage.setItem('token',accessToken);
    this.router.navigateByUrl('admin/dashboard');
    })
  ),{ dispatch: false });


  loginFailure$ = createEffect(()=> this.actions$.pipe(
    ofType(LoginPageActions.loadLoginsFailure),
    tap((error) => {
      console.log('error', error.error)
      this.router.navigateByUrl('/');
    })
  ), {dispatch: false});

// ==============Admin Effects================
  loadAdmins$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdminPageActions.loadAdmins),
    mergeMap(() => this.apiService.getAllAdmins().pipe(
      map( admins => AdminPageActions.loadAdminsSuccess({data: admins})),
      catchError(error => of(AdminPageActions.loadAdminsFailure({adminError:error})))
    ))
  ));

  createAdmin$ = createEffect(() => this.actions$.pipe(
    ofType(AdminPageActions.createAdmin),
    concatMap((action) => this.apiService.createAdmin(action.data).pipe(
      map((response) =>AdminPageActions.createAdminSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  updateAdmin$ =createEffect(() => this.actions$.pipe(
    ofType(AdminPageActions.updateAdmin),
    concatMap((action) => this.apiService.updateAdmin(action.id,action.data).pipe(
      map((response) => AdminPageActions.updateAdminSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  deleteAdmin$ =createEffect(() => this.actions$.pipe(
    ofType(AdminPageActions.deleteAdmin),
    mergeMap((action) => this.apiService.deleteAdmin(action.id).pipe(
      map((response) => AdminPageActions.deleteAdminSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));


// ==============User Effects================
  loadUsers$ = createEffect(()=> this.actions$.pipe(
    ofType(UserPagesActions.loadUsers),
    mergeMap(()  => this.apiService.getAllUsers().pipe(
      map(users => UserPagesActions.loadUsersSuccess({data:users})),
      catchError(error => of(UserPagesActions.loadUsersFailure({error:error})))
    ))
  ));

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserPagesActions.createUser),
    concatMap((action) => this.apiService.createUser(action.data).pipe(
      map((response) =>UserPagesActions.createUserSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  updateUser$ =createEffect(() => this.actions$.pipe(
    ofType(UserPagesActions.updateUser),
    concatMap((action) => this.apiService.updateUser(action.id,action.data).pipe(
      map((response) => UserPagesActions.updateUserSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  deleteUser$ =createEffect(() => this.actions$.pipe(
    ofType(UserPagesActions.deleteUser),
    mergeMap((action) => this.apiService.deleteUser(action.id).pipe(
      map((response) => UserPagesActions.deleteUserSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));


// ==============Company Effects================
  loadCompanies$ = createEffect(()=> this.actions$.pipe(
    ofType(CompanyPageActions.loadCompanys),
    mergeMap(()  => this.apiService.getAllCompanies().pipe(
      map(companies => CompanyPageActions.loadCompanysSuccess({data:companies})),
      catchError(error => of(CompanyPageActions.loadCompanysFailure({error:error})))
    ))
  ));


// ==============Riders Effects================
  loadRiders$ = createEffect(()=> this.actions$.pipe(
    ofType(RiderPageActions.loadRiders),
    mergeMap(()  => this.apiService.getAllRiders().pipe(
      map(riders => RiderPageActions.loadRidersSuccess({data:riders})),
      catchError(error => of(RiderPageActions.loadRidersFailure({error:error})))
    ))
  ));


// ==============Role Effects================
  loadRoles$ = createEffect(()=> this.actions$.pipe(
    ofType(RolePageActions.loadRoles),
    mergeMap(()  => this.apiService.getAllRoles().pipe(
      map(roles => RolePageActions.loadRolesSuccess({data:roles})),
      catchError(error => of(RolePageActions.loadRolesFailure({error:error})))
    ))
  ));


// ==============Feedback Effects================
  loadFeedback$ = createEffect(()=> this.actions$.pipe(
    ofType(FeedbackPageActions.loadFeedbacks),
    mergeMap(()  => this.apiService.getAllFeedbacks().pipe(
      map(feedbacks => FeedbackPageActions.loadFeedbacksSuccess({data:feedbacks})),
      catchError(error => of(FeedbackPageActions.loadFeedbacksFailure({error:error})))
    ))
  ));


// ==============Account Effects================
  loadAccount$ = createEffect(()=> this.actions$.pipe(
    ofType(AccountPageActions.loadAccounts),
    mergeMap(()  => this.apiService.getAllAccounts().pipe(
      map(accounts => AccountPageActions.loadAccountsSuccess({data:accounts})),
      catchError(error => of(AccountPageActions.loadAccountsFailure({error:error})))
    ))
  ));


// ==============Food Effects================
  loadFood$ = createEffect(()=> this.actions$.pipe(
    ofType(FoodPageActions.loadFoods),
    mergeMap(()  => this.apiService.getAllfoods().pipe(
      map(foods => FoodPageActions.loadFoodsSuccess({data:foods})),
      catchError(error => of(FoodPageActions.loadFoodsFailure({error:error})))
    ))
  ));


// ==============Order Effects================
  loadOrder$ = createEffect(()=> this.actions$.pipe(
    ofType(OrderPageActions.loadOrders),
    mergeMap(()  => this.apiService.getAllOrders().pipe(
      map(orders => OrderPageActions.loadOrdersSuccess({data:orders})),
      catchError(error => of(OrderPageActions.loadOrdersFailure({error:error})))
    ))
  ));


// ==============UserRole Effects================
  loadUserRoles$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(UserRolePageActions.loadUserRoles),
      mergeMap(()  => this.apiService.getAllUserRoles().pipe(
        map(userRoles => UserRolePageActions.loadUserRolesSuccess({data:userRoles})),
        catchError(error => of(UserRolePageActions.loadUserRolesFailure({error:error})))
      ))
    )
  );

  constructor
  (
  private actions$: Actions,
  private apiService: ApiServicesService,
  private router: Router

    ) {}

}
