import { AppEffects } from './effects/index.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './angular-material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CardComponent } from './components/card/card.component';
import { ContainerComponent } from './components/container/container.component';
import { UsersComponent } from './components/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminsComponent } from './components/admins/admins.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RidersComponent } from './components/riders/riders.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { FoodsComponent } from './components/foods/foods.component';
import { RolesComponent } from './components/roles/roles.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { StoreModule } from '@ngrx/store';
import { lunchAppReducer } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ApiServicesService } from './services/apiServices.service';
import { FoodOrderedComponent } from './components/charts/food-ordered/food-ordered.component';
import { HighestOrderDayComponent } from './components/charts/highest-order-day/highest-order-day.component';
import { TodaysOrdersComponent } from './components/todays-orders/todays-orders.component';
import { MiniCardComponent } from './components/mini-card/mini-card.component';
import { FoodDisplayCardComponent } from './components/food-display-card/food-display-card.component';
import { FeedbackDisplayCardComponent } from './components/feedback-display-card/feedback-display-card.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UserEntryComponent } from './components/user-entry/user-entry.component';
import { CompanyEntryComponent } from './components/company-entry/company-entry.component';
import { BulkUserEntryComponent } from './components/bulk-user-entry/bulk-user-entry.component';
import { UserRoleEntryComponent } from './components/user-role-entry/user-role-entry.component';
import { RiderEntryComponent } from './components/rider-entry/rider-entry.component';
import { FoodEntryComponent } from './components/food-entry/food-entry.component';
import { OrderEntryComponent } from './components/order-entry/order-entry.component';
import { ToastrModule } from 'ngx-toastr';
import { CostComponent } from './components/cost/cost.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GravatarModule } from 'ngx-gravatar';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    DashboardComponent,
    CardComponent,
    ContainerComponent,
    UsersComponent,
    AdminsComponent,
    OrdersComponent,
    RidersComponent,
    CompaniesComponent,
    FoodsComponent,
    RolesComponent,
    FeedbacksComponent,
    ForgetPasswordComponent,
    FoodOrderedComponent,
    HighestOrderDayComponent,
    TodaysOrdersComponent,
    MiniCardComponent,
    FoodDisplayCardComponent,
    FeedbackDisplayCardComponent,
    CreateAdminComponent,
    ConfirmDialogComponent,
    UserEntryComponent,
    CompanyEntryComponent,
    BulkUserEntryComponent,
    UserRoleEntryComponent,
    RiderEntryComponent,
    FoodEntryComponent,
    OrderEntryComponent,
    CostComponent,
    PaymentComponent,
    PasswordRecoveryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
     ReactiveFormsModule,
     LayoutModule,
     MatToolbarModule,
     MatButtonModule,
     MatSidenavModule,
     MatIconModule,
     MatListModule,
     MatGridListModule,
     MatCardModule,
     MatMenuModule,
     MatTableModule,
     MatPaginatorModule,
     GravatarModule,
     MatSortModule,
     StoreModule.forRoot({}),
     StoreModule.forFeature('lunch',lunchAppReducer),
     !environment.production ? StoreDevtoolsModule.instrument() : [],
     EffectsModule.forRoot([AppEffects]),
     ChartsModule,
     ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),


  ],
  entryComponents:[
    CreateAdminComponent,
    ConfirmDialogComponent,
    UserEntryComponent,
    CompanyEntryComponent,
    BulkUserEntryComponent,
    RiderEntryComponent,
    RiderEntryComponent,
    FoodEntryComponent,
    OrderEntryComponent,

   ],
  providers: [ApiServicesService, AuthGuardService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
