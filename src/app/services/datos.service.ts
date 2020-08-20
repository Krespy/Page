import { Injectable } from '@angular/core';
import { Usuarios } from '../Common/usuarios';

@Injectable({
  providedIn: 'root'
})
export class DatosService  {

  constructor(       
  ) { }

  CookieNombre: string = "CursosCookie"
  CookieOkPage: string = "CookieAceptada"
  CookieId: number = -1
  DataAuth: string = ""  
  logeado: boolean = false
  registrado: boolean = false
  TempRegisUser: string = ""
  TempRegisClave: string = ""
  UsuariosTotales: number = 0
  Diabetes: boolean = false
  activeLink: string
  activeLinkIndex: number = -1
  CerrarSess: boolean = false
  CursoId: number
    
  UrlServidor: string = ('http://152.170.233.124:9085/api/') 
  isMobile: boolean
  isTablet: boolean
  isDesktopDevice: boolean
  
  navLinks = [
    { path: '', label: 'Inicio', index: 0 },
    { path: 'iniciar-sesion', label: 'Ingresar', index: 1 },
    { path: 'perfil', label: 'Perfil', index: 2 },    
  ];
  
}