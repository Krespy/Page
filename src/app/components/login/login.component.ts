import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { DatosService } from 'src/app/services/datos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { AlertService } from 'src/app/services/alert.service';
import { checkCookieService } from 'src/app/services/checkCookie.service';
import { PathService } from 'src/app/services/Path.Service';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup
  selected = new FormControl(0);

  submitted = false;
  IngresoErroneo = false;   
  TempId: string = "0";
  data: any
  
  constructor(
    public _DatosG: DatosService,    
    public _ListaUsuarios: AppComponent,
    private _fb: FormBuilder,    
    private _router: Router,
    private _snackBar: MatSnackBar,    
    public _http: HttpClient,
    private AuthService: AuthService,
    private alertService: AlertService,
    private checkCookieService: checkCookieService,
    private _Path: PathService,
    private _login: LoginService,    
  ) { 



  this.loginForm = this._fb.group({
    user:['',Validators.compose([Validators.required,Validators.maxLength(20)])],
    password: ['',Validators.compose([Validators.required,Validators.maxLength(50)])]
  })
  }
  
  ngOnInit(){

    if(this._DatosG.CookieId != -1)
    {     
      // Reloggear ... En desarrollo 
      // this.data = this._User.getUserId(this._DatosG.CookieId)
      // this.CheckLogin(this.data.username,this.data.password  )
    }   
    
    
    if(this._DatosG.registrado)
    {      
      this.loginForm.setValue({
          'user': this._DatosG.TempRegisUser,
          'password': this._DatosG.TempRegisClave 
        })      
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  // Se modifico el Inicio de usuario con la info de json de template.

  iniciarSesion({user, password}){      
    
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    this.IngresoErroneo = false;          

    if (this.loginForm.invalid) {
         return;
    }
    this._login.CheckLoggin(user, password,this)
  }
  
  Registrarse(){
    //Rout to registrarse
    this._router.navigate(['/registrarme']) 
  }
  
  responseOk(a,b,data,c){
    console.log("Loggeo Correcto")    
    console.log("id: " + data.id)
      this._snackBar.open("Inicio de seccion Correcto", "Bienvenido", {
        duration: 4000,
        });    

      this.checkCookieService.GrabarCookie(data.id)       
      this._DatosG.CookieId = Number(data.id)
      this._Path.Loggearse(data.id)
  }

responseError(a,b,data,c){
  console.log("id: " + data.id)
    console.log("Loggeo Incorrecto")
    this._snackBar.open("Datos incorrectos", "Verifique!", {
      duration: 4000,
      });
    this.IngresoErroneo = true;
  }
}