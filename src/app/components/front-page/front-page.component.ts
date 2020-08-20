import { Component, OnInit, ViewChild} from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CardCursosComponent } from '../card-cursos/card-cursos.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { Slide } from '../carousel/carousel.interface';
import { checkCookieService } from 'src/app/services/checkCookie.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit{

  constructor(
    public _DatosG: DatosService,   
    private checkCookieService: checkCookieService,   
    private DeviceService: DeviceDetectorService
  ){}

   @ViewChild(CardCursosComponent) cardcursos: CardCursosComponent;

  deviceInfo = null 
  ListaDeCursos: any
  Tempencontrado = false
  CookieBanner = true
  
    
    ngOnInit(){      
      if (this.checkCookieService.CheckAceptarCookies())  { this.CookieBanner = false } // Si esta la saco
       // Al iniciar compruebo que tipo de dispositivo es
      this.deviceInfo = this.DeviceService.getDeviceInfo();
      this._DatosG.isMobile = this.DeviceService.isMobile();
      this._DatosG.isTablet = this.DeviceService.isTablet();
      this._DatosG.isDesktopDevice = this.DeviceService.isDesktop();  
    
   
    }
  cerrarSesion(){
    this._DatosG.logeado = false
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
  aceptarCookies(){
      this.checkCookieService.AceptarCookies()
      this.CookieBanner = false    
  }
    
  // Borrar
  BorrarCookieGeneral(){
      this.checkCookieService.BorrarCookieAceptada()
  }
}
