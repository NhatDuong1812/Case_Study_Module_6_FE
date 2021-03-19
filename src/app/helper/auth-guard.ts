import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {UserToken} from '../model/user-token';
import {AuthService} from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{
  currentUser: UserToken | undefined;

  constructor(private router: Router,
              private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;

    });
  }

  // tslint:disable-next-line:typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.currentUser){
      return true;
    }else {
      this.router.navigate(['/login', '/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  // tslint:disable-next-line:max-line-length typedef
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.currentUser){
      return true;
    }else {
      this.router.navigate(['/login', '/'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

}
