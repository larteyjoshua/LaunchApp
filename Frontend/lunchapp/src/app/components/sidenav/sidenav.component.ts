import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { logout } from '../../actions/login.actions';
import { getUserName } from '../../selectors/index.selectors';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  menuItems = [
    'dashboard',
   'admins',
   'roles',
    'users',
    'foods',
    'orders',
    'riders',
    'companies',
     'payments' ,
     'costs',
     'feedbacks'];

    public userEmail: Observable<string>;
    public email: string = '';


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    ) {
      this.userEmail = this.store.pipe(select(getUserName));
      this.userEmail.subscribe(email => {
        console.log('email', email)
        const splitEmail = email.split('@')
        this.email = splitEmail[0];
      })
    }
   onLogout() {
    this.store.dispatch(logout());
  console.log('i am being Click');
   }

}
