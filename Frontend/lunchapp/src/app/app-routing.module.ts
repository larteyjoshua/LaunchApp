import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContainerComponent } from './components/container/container.component';
import { UsersComponent } from './components/users/users.component';
import { AdminsComponent } from './components/admins/admins.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RidersComponent } from './components/riders/riders.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { FoodsComponent } from './components/foods/foods.component';
import { RolesComponent } from './components/roles/roles.component';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CostComponent } from './components/cost/cost.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
 },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    pathMatch: 'full'

  },
  {
    path: 'passwordRecover',
     component: PasswordRecoveryComponent
  },

  {
    path: 'admin',
    component: ContainerComponent,
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    canActivateChild:  [AuthGuardService],

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },

      {
        path: 'users',
        component: UsersComponent,
      },

      {
        path: 'admins',
        component: AdminsComponent,

      },

      {
        path: 'orders',
        component: OrdersComponent,

      },

      {
        path: 'riders',
        component: RidersComponent,
      },

      {
        path: 'companies',
        component: CompaniesComponent,
      },

      {
        path: 'foods',
        component: FoodsComponent,
      },
    {
      path: 'roles',
      component: RolesComponent
    },
    {
      path: 'feedbacks',
      component: FeedbacksComponent
    },
    {
      path: 'payments',
      component: PaymentComponent
    },

    {
      path: 'costs',
      component: CostComponent
    }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
