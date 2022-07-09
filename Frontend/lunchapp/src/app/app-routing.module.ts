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
import { AccountsComponent } from './components/accounts/accounts.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent

  },

  {
    path: 'admin',
    component: ContainerComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'admins',
        component: AdminsComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'riders',
        component: RidersComponent
      },
      {
        path: 'companies',
        component: CompaniesComponent
      },
      {
        path: 'foods',
        component: FoodsComponent
      }
    ,
    {
      path: 'roles',
      component: RolesComponent
    },
    {
      path: 'feedbacks',
      component: FeedbacksComponent
    },
    {
      path: 'accounts',
      component: AccountsComponent
    }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
