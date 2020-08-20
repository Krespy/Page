import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { Router } from '@angular/router';
import { checkCookieService } from 'src/app/services/checkCookie.service';
import { PathService } from 'src/app/services/Path.Service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})

export class PerfilComponent implements OnInit {
  results: any;
  cursos: any;   
  @ViewChild(SpinnerComponent, { static:true }) hijo: SpinnerComponent
  
  constructor(
    public _DatosG: DatosService,  
    private _Router: Router,    
    private _Cookie: checkCookieService,
    private _Path: PathService     
  ) { }
  
  ngOnInit(){
    // Chequear al entrar si esta alguien logeado o no, e ir al perfil/id
    
    

    if(!this._Cookie.check())
    {
      this._DatosG.logeado= false
      this._Path.DesLoggearse()
    }
    if(this._DatosG.logeado)
    {
      console.log("Cuantas veces entro aca?")
      this._Router.navigate(['/perfil', "Id:Session:"+ this._DatosG.CookieId])
    } 
    
    // this.route.paramMap.subscribe(params => { 
    //   this._Cursos.GetCursosId(params.get('id'),this)
    //  }) // Muestro temporalmente los datos del usaurio   
    
    
  }    
  

  PropagarSpinner(msg){
    console.log("Recibi el emitter del hijo Card - Envio al Hijo Spinner")
    this.hijo.Enable = false
  }

  cerrarSesion(){
    this._DatosG.logeado = false
    this._DatosG.CerrarSess = false
    this._DatosG.navLinks.splice(3, 1);    
    this._Router.navigate(['/']) 
  }
}
