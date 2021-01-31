import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGaurd implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/'])
    }
  }

  
    canLoad(route: Route) {
      if(this.authService.isAuth()) {
        return true;
      } else {
        this.router.navigate(['/'])
      }
    }
  
}
