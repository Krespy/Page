import { Injectable } from '@angular/core';
import { PathService } from './Path.Service';
import { DatosService } from './datos.service';
import { AuthService } from './auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { checkCookieService } from './checkCookie.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    
  constructor(
    private AuthService: AuthService
   ) { }


  CheckLoggin(user,password,objectCalled){
    console.log(user)
    console.log(password)
    this.AuthService.login(user, password,objectCalled)    
  }

}