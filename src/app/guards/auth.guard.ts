import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginComponent } from '../components/login/login.component';
import { DatosService } from '../services/datos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PathService } from '../services/Path.Service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<LoginComponent> {

  constructor(
    private _DatosG: DatosService,    
    private _router: Router,
    private _snackBar:  MatSnackBar,
    private PathService: PathService
 ){}

 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this._DatosG.logeado){
        this._snackBar.open("Por favor para entrar !!", "inicie sesión", {
          duration: 4000,
        });
        this._router.navigate(['/iniciar-sesion'])              
        }

    return this._DatosG.logeado;
  }
  canDeactivate(
    component: LoginComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {   
    this._DatosG.registrado=false 
    if(this._DatosG.logeado && !this._DatosG.CerrarSess){ 
      this.PathService.Loggearse(this._DatosG.CookieId)
       
             
      return true
      }
    return true
  }
  
}
