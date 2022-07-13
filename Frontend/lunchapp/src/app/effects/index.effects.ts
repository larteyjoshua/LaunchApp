import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { ApiServicesService } from '../services/apiServices.service';
import { Router } from '@angular/router';
import { concatMap, exhaustMap, switchMap, takeUntil, tap } from 'rxjs/operators';
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
import { serializeError } from 'serialize-error';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



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
      this.toastrService.error( error.error.error.detail, 'Major Error', {
      });
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

  bulkUserCreate$ = createEffect(() => this.actions$.pipe(
    ofType(UserPagesActions.UploadRequestAction),
    concatMap(action => this.apiService.bulkCreateUser(action.file).pipe(
      map((response) =>UserPagesActions.createBulkUserSuccess({data:response})),
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


  createCompany$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyPageActions.createCompany),
    concatMap((action) => this.apiService.createCompany(action.data).pipe(
      map((response) =>CompanyPageActions.createCompanySuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  updateCompany$ =createEffect(() => this.actions$.pipe(
    ofType(CompanyPageActions.updateCompany),
    concatMap((action) => this.apiService.updateCompany(action.id,action.data).pipe(
      map((response) => CompanyPageActions.updateCompanySuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  deleteCompany$ =createEffect(() => this.actions$.pipe(
    ofType(CompanyPageActions.deleteCompany),
    mergeMap((action) => this.apiService.deleteCompany(action.id).pipe(
      map((response) => CompanyPageActions.deleteCompanySuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
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

  createRider$ = createEffect(() => this.actions$.pipe(
    ofType(RiderPageActions.createRider),
    concatMap((action) => this.apiService.createRider(action.data).pipe(
      map((response) =>RiderPageActions.createRiderSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  updateRider$ =createEffect(() => this.actions$.pipe(
    ofType(RiderPageActions.updateRider),
    concatMap((action) => this.apiService.updateRider(action.id,action.data).pipe(
      map((response) => RiderPageActions.updateRiderSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  deleteRider$ =createEffect(() => this.actions$.pipe(
    ofType(RiderPageActions.deleteRider),
    mergeMap((action) => this.apiService.deleteRider(action.id).pipe(
      map((response) => RiderPageActions.deleteRiderSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
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
  createFood$ = createEffect(() => this.actions$.pipe(
    ofType(FoodPageActions.createFood),
    concatMap((action) => this.apiService.createFood(action.data).pipe(
      map((response) =>FoodPageActions.createFoodSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  updateFood$ =createEffect(() => this.actions$.pipe(
    ofType(FoodPageActions.updateFood),
    concatMap((action) => this.apiService.updateFood(action.data).pipe(
      map((response) => FoodPageActions.updateFoodSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  deleteFood$ =createEffect(() => this.actions$.pipe(
    ofType(FoodPageActions.deleteFood),
    mergeMap((action) => this.apiService.deleteFood(action.id).pipe(
      map((response) => FoodPageActions.deleteFoodSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
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
  updateOrder$ =createEffect(() => this.actions$.pipe(
    ofType(OrderPageActions.updateOrder),
    concatMap((action) => this.apiService.updateOrder(action.id,action.data).pipe(
      map((response) => OrderPageActions.updateOrderSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  deleteOrder$ =createEffect(() => this.actions$.pipe(
    ofType(OrderPageActions.deleteOrder),
    mergeMap((action) => this.apiService.deleteOrder(action.id).pipe(
      map((response) => OrderPageActions.deleteOrderSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
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


  createUserRole$ = createEffect(() => this.actions$.pipe(
    ofType(UserRolePageActions.createUserRole),
    concatMap((action) => this.apiService.createUserRole(action.data).pipe(
      map((response) =>UserRolePageActions.createUserRoleSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  updateUserRole$ =createEffect(() => this.actions$.pipe(
    ofType(UserRolePageActions.updateUserRole),
    concatMap((action) => this.apiService.updateUserRole(action.id,action.data).pipe(
      map((response) => UserRolePageActions.updateUserRoleSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));

  deleteUserRole$ =createEffect(() => this.actions$.pipe(
    ofType(UserRolePageActions.deleteUserRole),
    mergeMap((action) => this.apiService.deleteUserRole(action.user_id).pipe(
      map((response) => UserRolePageActions.deleteUserRoleSuccess({data:response})),
      catchError(error => of(CoreActions.deplayFailure({response:error})))
    ))
  ));


  displatFailure$ = createEffect(() => this.actions$.pipe(
    ofType(CoreActions.deplayFailure),
    tap(action => {
      console.log('action', action.response)
      const error = action.response.error.detail || action.response.error
      this.toastrService.warning(error, 'Minor Error', {

      });
    })
    ),
    {dispatch: false}
    );


  constructor
  (
  private actions$: Actions,
  private apiService: ApiServicesService,
  private router: Router,
  private toastrService: ToastrService

    ) {}
    // private getActionFromHttpEvent(event: HttpEvent<any>) {
    //   console.log('event', event)
    //   switch (event.type) {
    //     case HttpEventType.Sent: {
    //       return UserPagesActions.UploadStartedAction();
    //     }
    //     case HttpEventType.UploadProgress: {
    //       return  UserPagesActions.UploadProgressAction({
    //         progress: Math.round((100 * event.loaded) / Number(event.total))
    //       });
    //     }
    //     case HttpEventType.ResponseHeader:
    //     case HttpEventType.Response: {
    //       console.log('event', event)
    //       if (event.status === 200) {
    //         console.log('event', event)
    //         return  UserPagesActions.UploadCompletedAction();
    //       } else {
    //         console.log('event', event)
    //         return  CoreActions.deplayFailure({
    //           response: event.statusText
    //         });
    //       }
    //     }
    //     default: {
    //       return CoreActions.deplayFailure({
    //         response: event
    //       });
    //     }
    //   }
    // }

    // private handleError(error: any) {
    //   const friendlyErrorMessage = serializeError(error).message;
    //   return  CoreActions.deplayFailure({
    //     response: friendlyErrorMessage
    //   });
    // }
}


