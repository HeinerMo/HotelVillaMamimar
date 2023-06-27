import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements OnDestroy {
    
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //console.log(localStorage.getItem('USERNAME'))
      let url: string = state.url;
    return this.checkUser(next, url);
  }

  private checkUser(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.adminService.isLoggedIn()) {
      //console.log("logeado")
      return true;
    }
    //console.log("no logeado")

    this.router.navigate(['/login']);
    return false;
  }

}
