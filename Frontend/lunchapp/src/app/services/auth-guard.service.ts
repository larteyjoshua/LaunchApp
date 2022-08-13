import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot,
UrlTree,
CanActivateChild,
CanLoad,
Route,
UrlSegment} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { AppState } from '../reducers';
import { getToken } from '../selectors/index.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

    public token: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private route: Router,
    ) {
      this.token = this.store.pipe(select(getToken));
    }
  canLoad(
    route: Route,
    segments: UrlSegment[]
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      let tokenData = true;
      this.token.subscribe(token => {
        if (!token){
         tokenData = false
          this.route.navigateByUrl('/login')
        }
     })
     console.log('can load', tokenData)
     return tokenData;
}



  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

      let tokenData = true;
      this.token.subscribe(token => {
        if (!token){
         tokenData = false
          this.route.navigateByUrl('/login')
        }
     })
     console.log('can Activate', tokenData)
     return tokenData;
}



  canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): boolean {

      let tokenData = true;
      this.token.subscribe(token => {
        if (!token){
         tokenData = false
          this.route.navigateByUrl('/login')
        }
     })
     console.log('can Activate', tokenData)
     return tokenData;
}

}
