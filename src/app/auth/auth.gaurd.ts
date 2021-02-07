import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "./auth.service";
import * as fromRoot from './../app.reducer';
import { Store } from '@ngrx/store'
import { take } from "rxjs/operators";

@Injectable()
export class AuthGaurd implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.State>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }

  
    canLoad(route: Route) {
      return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    }
  
}
