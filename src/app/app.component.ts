import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from './services/datos.service';

import { Slide } from "./components/carousel/carousel.interface";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { CursosDisponibles } from './Common/cursosdisponibles';
import { checkCookieService } from './services/checkCookie.service'
import { PathService } from './services/Path.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  
  title = 'Cursos';
  Cursos: CursosDisponibles [] = []
  CookieBanner = true
  
  
  constructor(
    public _DatosG: DatosService,
    public _router: Router,
    private checkCookieService: checkCookieService,    
    private _path: PathService
   
  ){}

  background = 'primary'; 
 

  ngOnInit(){    
    
    if (this.checkCookieService.CheckAceptarCookies())  { this.CookieBanner = false } // Si esta la saco
    
    if(this.checkCookieService.check()){
      this._path.Loggearse(this._DatosG.CookieId)        
    }      
    
    
    this._router.navigate(['/'])   
    this._router.events.subscribe((res) => {     
      
      for (let i = 0; i < this._DatosG.navLinks.length; i++)
      {      
        if (this._router.url == "/" + this._DatosG.navLinks[i].path)
        {          
          this._DatosG.activeLinkIndex = i;
          break;
        }      
      }
      });
  }
  // ------------------------------------------------------------ Datos para Carousel --------------------------------------------------------------------
  aceptarCookies(){
    this.checkCookieService.AceptarCookies()
    this.CookieBanner = false    
  }

  // ------------------------------------------------------------ Datos para Carousel --------------------------------------------------------------------
  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  
  
  slides: Slide[] = [
    {
      headline: "For Your Current Mood",
      src:
        "assets/f1.jpg"
    },
    {
      headline: "Miouw",
      src:
      "assets/f2.jpg"
    },
    {
      headline: "In The Wilderness",
      src:
      "assets/f3.jpg"
    },
    {
      headline: "Focus On The Writing",
      src:
      "assets/f4.jpg"
    },
    {
      headline: "Focus On The Writing",
      src:
      "assets/f5.jpg"
    }
  ];
  // ------------------------------------------------------------ Datos para Carousel --------------------------------------------------------------------
  
  // Borrar
  BorrarCookieGeneral(){
    this.checkCookieService.BorrarCookieAceptada()
  }
}


