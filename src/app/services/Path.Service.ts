import { Injectable } from '@angular/core';
import { Datos } from '../Common/DatosCursos';
import { DatosService } from './datos.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PathService  {

  constructor( 
      private _DatosG: DatosService,
      private _router: Router      
  ) { }

  Loggearse(id){
    this._DatosG.CerrarSess = true    
    this._DatosG.logeado = true
    this._DatosG.navLinks.splice(this._DatosG.navLinks[2].index,1)  // Borra Perfil       
    this._DatosG.navLinks.splice(this._DatosG.navLinks[1].index,1)  // Borra inicio de secion      
    this._DatosG.navLinks.push({ path: 'perfil', label: 'Perfil', index: 1 }); 
    this._DatosG.navLinks.push({ path: 'Cerrar-sesion', label: 'Cerrar sesion', index: 2 });       
    this._router.navigate(['/perfil', id])      
  }
  DesLoggearse(){      
    this._DatosG.CerrarSess = false  
    this._DatosG.logeado =false    
    this._router.navigate(['/'])  
    this._DatosG.navLinks.splice(this._DatosG.navLinks[2].index,1) // Borra  Cerrar Session
    this._DatosG.navLinks.splice(this._DatosG.navLinks[1].index,1) // Borra  Perfil
    this._DatosG.navLinks.push({ path: 'iniciar-sesion', label: 'Ingresar', index: 1 }); 
    this._DatosG.navLinks.push({ path: 'perfil', label: 'Perfil', index: 2 });     
    
  }

}
