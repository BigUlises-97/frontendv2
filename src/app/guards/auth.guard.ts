import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor( private auth:AuthService,
              private router:Router
            ){ }

  canActivate(): boolean{

    if(this.auth.autenticado()){ //Si regresa verdadero entonces autentica
      return true;
    }else{
      this.router.navigateByUrl('/login'); //Si no, te regresa al login
      return false;
    }
  }

/* ORIGINAL CODE 
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  */
}
