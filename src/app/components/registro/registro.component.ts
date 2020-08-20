import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.services';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  Existente = false; 
  ExistenteMail = false;
  RegistroError: string = ""
  
  UsuarioForm = new FormData();
 
  constructor(    
    private _DatosG: DatosService,    
    private _Router: Router,
    private formBuilder: FormBuilder,
    private _Auth: AuthService,
    private alertService: AlertService    
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      Usuario: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Direccion: [''],
      Email: ['', Validators.compose([Validators.required, Validators.email])]
      
  });

    this._DatosG.registrado = false    
  } 

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.RegistroError = "";
    this.submitted = true;
    this.Existente = false;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this._Auth.Registrar(this.registerForm.controls['Usuario'].value, this.registerForm.controls['password'].value, this.registerForm.controls['Nombre'].value, this.registerForm.controls['Apellido'].value, this.registerForm.controls['Direccion'].value, this.registerForm.controls['Email'].value, this)            
  }
  volver(){
    this._Router.navigate(['/iniciar-sesion'])    
  }

  responseOk(data: any) {
    this._DatosG.registrado = true
    console.log(data);
    this._DatosG.TempRegisUser = this.registerForm.controls['Usuario'].value
    this._DatosG.TempRegisClave = this.registerForm.controls['password'].value   
    this._Router.navigate(['/iniciar-sesion']);     
    return
  }
  
  responseError(data: any) {
    if (data.error.message == "El email ya está registrado") {
        this.ExistenteMail = true;  
        this.RegistroError = data.error.message; 
        console.log("Entre al error de mail")
      }        
    else if (data.error.message == "El username ya está registrado") { 
      this.Existente = true;
      this.RegistroError = "El usuario ya esta registrado"
      console.log("Entre al error de usuario")
    }    
    this._DatosG.registrado = false
    console.log(data);
    return
  }
    
}

